package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sahaphonArt/sa-67-example/config"
	"github.com/sahaphonArt/sa-67-example/controller"
)

const PORT = "8000"

func main() {

	// open connection database
	config.ConnectionDB()

	// Generate databases
	config.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	router := r.Group("")
	{
		router.GET("/product/:id",product.GetProduct)
        router.GET("/list_products", product.ListProduct)
		router.POST("/create_product", product.CreateProduct)
        router.PATCH("/update_product",product.UpdateProduct)
        router.DELETE("/delete_product/:id",product.DeleteProduct)

		router.GET("/list_concerts", product.ListConcert)

	}

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})

	// Run the server

	r.Run("localhost:" + PORT)

}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
