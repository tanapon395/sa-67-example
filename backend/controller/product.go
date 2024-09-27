package product

import (
	"github.com/gin-gonic/gin"
	"github.com/sahaphonArt/sa-67-example/config"
	"github.com/sahaphonArt/sa-67-example/entity"
	"net/http"
)

func CreateProduct(c *gin.Context) {
	var products entity.Product

	// bind เข้าตัวแปร products
	if err := c.ShouldBindJSON(&products); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// ค้นหา concert ด้วย id
	var concerts entity.Concert
	db.First(&concerts, products.ConcertID)
	if concerts.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Concert not found"})
		return
	}

	// สร้าง Product
	pd := entity.Product{
		ProductName: products.ProductName,
		Stock:       products.Stock,
		Price:       products.Price,
		Picture:     products.Picture,
		ConcertID:   products.ConcertID,
		Concert:     concerts,
	}

	// บันทึก
	if err := db.Create(&pd).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": pd})
}

// GET /product/:id
func GetProduct(c *gin.Context) {
	ID := c.Param("id")
	var products entity.Product

	db := config.DB()
	results := db.Preload("Concert").First(&products, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if products.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, products)
}


// GET /List Product
func ListProduct(c *gin.Context) {
	var product []entity.Product

	db := config.DB()

	db.Find(&product)

	c.JSON(http.StatusOK, &product)
}

// GET /List Concert
func ListConcert(c *gin.Context) {
	var concerts []entity.Concert

	db := config.DB()

	db.Find(&concerts)

	c.JSON(http.StatusOK, &concerts)
}

// // PATCH(Update) Product (Edit)
func UpdateProduct(c *gin.Context) {
	var product entity.Product

	ProductID := c.Param("id")

	db := config.DB()
	result := db.First(&product, ProductID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&product)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

// DELETE /Product/:id
func DeleteProduct(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM products WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}
