package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
	"sync"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

var wg sync.WaitGroup = sync.WaitGroup{}

func readFile(fname string, ch chan Representation) {
	bytes, err := ioutil.ReadFile(fname)
	var data Representation

	if err != nil {
		panic(err)
	}

	if err := json.Unmarshal(bytes, &data); err != nil {
		panic(err)
	}

	ch <- data
	wg.Done()
}

func getData(n int) []Object {
	data := []Representation{}
	files, err := ioutil.ReadDir("./data")

	if err != nil {
		panic(err)
	}

	for i := 0; i < n; i++ {
		ch := make(chan Representation)
		wg.Add(1)

		go readFile(fmt.Sprintf("./data/%s", files[i].Name()), ch)
		data = append(data, <-ch)
	}

	objects := []Object{}

	for i := 0; i < len(data); i++ {
		objects = append(objects, data[i].Data)
	}

	return objects
}

func removeDuplicateValues(slice []string) []string {
	keys := make(map[string]bool)
	list := []string{}

	for _, entry := range slice {
		if _, value := keys[entry]; !value {
			keys[entry] = true
			list = append(list, entry)
		}
	}
	return list
}

func main() {
	var n int = 100

	if len(os.Args) >= 1 {
		argn, err := strconv.Atoi(os.Args[1])

		n = argn

		if err != nil {
			panic(err)
		}
	}

	fmt.Printf("n = %d\n", n)

	app := fiber.New()
	app.Use(cors.New())
	app.Static("/static", "./static")

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Render("./static/display.html", nil)
	})

	app.Get("/data", func(c *fiber.Ctx) error {
		products := getData(n)
		collections := []string{}

		for i := 0; i < len(products); i++ {
			collections = append(collections, products[i].ArticleType.TypeName)
		}

		d := map[string]interface{}{
			"products":    products,
			"collections": removeDuplicateValues(collections),
		}

		return c.JSON(d)
	})

	app.Listen(":3151")

}
