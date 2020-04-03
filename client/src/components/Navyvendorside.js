import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap'
import { getCustomers } from "../utils/API"

function Navy(props) {
    const [queryValue, setValue] = useState('')
    const [userList, setUserList] = useState([])
   
   

   function handleGetCustomers (){
        getCustomers().then(({ data: userData }) => {
            console.log("userData: ", userData);
            setUserList(userData)
            console.log("userlist ",userList)
        }).catch(err => console.log(err))

       

    }

    useEffect(() => {
        handleGetCustomers()

    }, [])
    
    

    let styles = {

        fontFamily: 'Titan One',
        color: 'yellow',

    };

    let searchDiv = {
        backgroundColor: 'lightyellow',
    };

    if (queryValue) {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/" style={styles}>yellowchat</Navbar.Brand>
                    <Nav className="mr-auto">
                       
                        <Nav.Link href="/vendorRegister">For Vendors</Nav.Link>
                        <Nav.Link href="#">Blog</Nav.Link>

                    </Nav>
                    <Form inline>
                        <input onChange={event => setValue(event.target.value)} class="form-control" type="text" placeholder="chat local shops" aria-label="Search"></input>
                
                    </Form>
                </Navbar>

                {userList.filter(name => name.name.toLowerCase().includes(queryValue)).map(filteredName => (

                    <div style={searchDiv}>
                        <tr>
                            <th scope="row"></th>
                     
                            <td>{filteredName.company}</td>
                         
                            <a href={'/vendor/' + filteredName.name}><td>@yellowchat</td></a>

                        </tr>
                    </div>


                ))}

            </div>
        )
    }
    //else if no query value render this ->
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/" style={styles}>yellowchat</Navbar.Brand>
                <Nav className="mr-auto">
                  
                    <Nav.Link href="#">Search for Customers</Nav.Link>
                    <Nav.Link href="#">Contact</Nav.Link>

                </Nav>
                <Form inline>
                    <input onChange={event => setValue(event.target.value)} class="form-control" type="text" placeholder="Search" aria-label="Search"></input>
                   
                </Form>
            </Navbar>
        </div>
    )

}

export default Navy;