package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"sync"

	"github.com/gofiber/fiber/v2"
)

var wg sync.WaitGroup = sync.WaitGroup{}

type ImageData struct {
	ImageURL string `json:"imageURL"`
}

type Object struct {
	Price              float64 `json:"price"`
	BaseColour         string  `json:"baseColour"`
	ProductDisplayName string  `json:"productDisplayName"`

	StyleImages struct {
		Default ImageData `json:"default"`
		Back    ImageData `json:"back"`
		Front   ImageData `json:"front"`
	} `json:"styleImages"`

	ArticleType struct {
		TypeName string `json:"typeName"`
	} `json:"articleType"`

	ProductDescriptors struct {
		Description struct {
			Value string `json:"value"`
		} `json:"description"`
	} `json:"productDescriptors"`
}

type Representation struct {
	Data Object `json:"data"`
}

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

func removeDuplicateValues(intSlice []string) []string {
	keys := make(map[string]bool)
	list := []string{}

	// If the key(values of the slice) is not equal
	// to the already present value in new slice (list)
	// then we append it. else we jump on another element.
	for _, entry := range intSlice {
		if _, value := keys[entry]; !value {
			keys[entry] = true
			list = append(list, entry)
		}
	}
	return list
}

func main() {

	app := fiber.New()

	app.Static("/static", "./static")

	app.Get("/", func(c *fiber.Ctx) error {

		return c.Render("./static/display.html", nil)
	})

	app.Get("/data", func(c *fiber.Ctx) error {
		products := getData(25)
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
