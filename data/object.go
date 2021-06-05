package main

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
