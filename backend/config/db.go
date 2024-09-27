package config

import (
	"fmt"
	// "log"
	// "time"

	"github.com/sahaphonArt/sa-67-example/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)
var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	db.AutoMigrate(

		&entity.Product{},
		&entity.ShoppingCart{},
		&entity.ProductPayment{},

	)
}

func ConnectionDB() {
	// เชื่อมต่อฐานข้อมูล SQLite
	database, err := gorm.Open(sqlite.Open("sa.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	fmt.Println("connected database")
	db = database

	SetupDatabase()
}