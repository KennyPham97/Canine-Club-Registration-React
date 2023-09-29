import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import './LoginApi.css'

const LoginApi = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [carouselItems, setCarouselItems] = useState([])

  const fetchDogImage = async () => {
    let response = await fetch("https://dog.ceo/api/breeds/image/random")
    let data = await response.json()
    console.log(data.message)
    return data.message;
  };
  //This handleSubmit function will do all of these functions, so the form on submit is doing alot of things. It'll show in the console that you registered a user, prevent the page from re loading, place dogImage in a variable called newPhoto, and the submitted state is now true. Then it creates an item object that contains the input data that is set because of the onChange function in the input fields. Then , using a spread operator, it sets carouselItems array as an array that contains the item objects. Then the function clears the input fields so that a user can input new information.
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("User entered firstName: ", firstName)

    const newPhoto = await fetchDogImage()
    setIsSubmitted(true);
    
    const item = {firstName,lastName,birthDate,photo: newPhoto,};
    setCarouselItems([item, ...carouselItems]);
    setFirstName("");
    setLastName("");
    setBirthDate("");
    };

  return (
    <div className="container">
        <h1>Canine Club</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name for Your Dog</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} //setting the user's input based on keystroke change
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name for Your Dog</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBirthDate">
          <Form.Label>Dog Birth Date</Form.Label>
          <Form.Control
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register User
        </Button>
      </Form>

      {isSubmitted && ( //conditional rendering, if submitted is true, then return this entire carousel. Then iterate thru the newly created carousel items, giving them an index. Then the card categories get their values from the values in the item object. 
        <Carousel className='carousel'>
          {carouselItems.map((item, index) => (
            <Carousel.Item key={index}>
              <Card style={{ width: "30rem" }}>
                <Card.Body>
                <Card.Img src={item.photo} />
                  <Card.Text>{item.firstName}</Card.Text>
                  <Card.Text>{item.lastName}</Card.Text>
                  <Card.Text>{item.birthDate}</Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default LoginApi;

