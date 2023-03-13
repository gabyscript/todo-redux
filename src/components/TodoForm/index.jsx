
import {Container, Button, Form, Row, Col} from 'react-bootstrap';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { addNewTodo } from '../../redux/todoSlice';

const TodoForm = () => {

    const todos = useSelector((state) => state.todos);
    const [inputValue, setInputValue] = useState("")
    

    const dispatch = useDispatch();

    const submitTodoForm = (e) => {
        e.preventDefault()
        if(inputValue === "") {
            alert("Complete con una tarea antes de presionar el botón")
            return
        }
        let newTodo = {
            id: todos.length,
            label: inputValue,
            checked: false
        }
        console.log(newTodo)
        dispatch(addNewTodo({newTodo})) 
        setInputValue("")
    }
    return (
        <Container fluid className="d-flex justify-content-center">
            <Form onSubmit={submitTodoForm}>
                <Row>
                    <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                        <Form.Control type="text" placeholder="Enter new to do" value={inputValue} onChange={(e) =>setInputValue(e.target.value)}></Form.Control>
                    </Col>
                    <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                        <Button variant="primary" type="submit">
                            ADD TO DO
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default TodoForm