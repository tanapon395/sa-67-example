package unit

import (
	"fmt"
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/tanapon395/sa-67-example/entity"
)

func TestStudentID(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`student_id is required`, func(t *testing.T) {
		user := entity.User{
			StudentID: "", // ผิดตรงนี้
			FirstName: "Unit",
			LastName:  "test",
			Email:     "test@gmail.com",
			Phone:     "0800000000",
			Profile:   "",
			Password:  "",
			BirthDay:  time.Now().AddDate(-20, 0, 0),
			LinkedIn:  "https://www.linkedin.com/company/ilink/",
			GenderID:  1,
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(user)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).NotTo(BeTrue())
		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).NotTo(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("StudentID is required"))
	})

	t.Run(`student_id pattern is not true`, func(t *testing.T) {
		user := entity.User{
			StudentID: "K5000000", // ผิดตรงนี้
			FirstName: "unit",
			LastName:  "test",
			Email:     "test@gmail.com",
			Phone:     "0800000000",
			Profile:   "",
			Password:  "",
			BirthDay:  time.Now().AddDate(-20, 0, 0),
			LinkedIn:  "https://www.linkedin.com/company/ilink/",
			GenderID:  1,
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(user)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).NotTo(BeTrue())
		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).NotTo(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal(fmt.Sprintf("StudentID: %s does not validate as matches(^[BMD]\\d{7}$)", user.StudentID)))
	})
}

func TestPhoneNumber(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`phone_number is required`, func(t *testing.T) {
		user := entity.User{
			StudentID: "B5000000",
			FirstName: "Unit",
			LastName:  "test",
			Email:     "test@gmail.com",
			Phone:     "", // ผิดตรงนี้
			Profile:   "",
			Password:  "",
			BirthDay:  time.Now().AddDate(-20, 0, 0),
			LinkedIn:  "https://www.linkedin.com/company/ilink/",
			GenderID:  1,
		}
		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(user)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).NotTo(BeTrue())
		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).NotTo(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("Phone is required"))

	})

	t.Run(`phone_number check 10 digit`, func(t *testing.T) {
		user := entity.User{
			StudentID: "B5000000",
			FirstName: "Unit",
			LastName:  "test",
			Email:     "test@gmail.com",
			Phone:     "080800000000", // ผิดตรงนี้ มี 11 ตัว
			Profile:   "",
			Password:  "",
			BirthDay:  time.Now().AddDate(-20, 0, 0),
			LinkedIn:  "https://www.linkedin.com/company/ilink/",
			GenderID:  1,
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(user)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).NotTo(BeTrue())
		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).NotTo(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal(fmt.Sprintf("Phone: %s does not validate as stringlength(10|10)", user.Phone)))

	})
}

func TestUser_Valid(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("valid user", func(t *testing.T) {
		// A valid user object
		user := entity.User{
			StudentID: "B6601140",
			FirstName: "John",
			LastName:  "Doe",
			Email:     "john.doe@example.com",
			Phone:     "0801234567",
			Profile:   "A detailed profile description.",
			LinkedIn:  "https://www.linkedin.com/in/johndoe/",
			Password:  "securepassword",
			BirthDay:  time.Now().AddDate(-20, 0, 0),
			GenderID:  1,
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(user)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).To(BeTrue(), "Expected validation to pass, but it failed.")
		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).To(BeNil(), "Expected no validation errors, but got some.")
	})
}
