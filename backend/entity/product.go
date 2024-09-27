package entity

import (
	"time"

	"gorm.io/gorm"
)

type Product struct {
	gorm.Model

	ProductName string `json:"product_name"`
	Stock       int    `json:"stock"`
	Price       int    `json:"price"`
	Picture     string `gorm:"type:longtext"`

	ConcertID uint
	Concert   Concert `gorm:"foreignKey:ConcertID"`

	ShoppingCarts []ShoppingCart
}

type ShoppingCart struct {
	gorm.Model

	Amount     int    `json:"amount"`
	TotalPrice int    `json:"total_price"`
	Detail     string `json:"detail"`

	ProductID uint
	Product   Product `gorm:"foreignKey:product_id"`

	MemberID uint
	// Member   Member `gorm:"foreignKey:MemberID"`

	ProductPayment []ProductPayment
}

type ProductPayment struct {
	gorm.Model

	PaymentMethod string    `json:"payment_method"`
	PaymentDate   time.Time `json:"payment_date"`
	TotalAmount   int       `json:"total_amount"`

	ShoppingCartID uint
	ShoppingCart   ShoppingCart `gorm:"foreignKey:shopping_cart_id"`
}

//test
type Concert struct {
	gorm.Model

	Name string

	Products []Product `gorm:"foreignKey:ConcertID"`

}
