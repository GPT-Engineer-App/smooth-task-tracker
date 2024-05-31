import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setEditingTask(index);
    setEditingText(tasks[index].text);
  };

  const saveTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: editingText } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setEditingText("");
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <Container maxW="container.md" py={10}>
      <Heading mb={6} textAlign="center">
        Todo App
      </Heading>
      <Flex mb={4}>
        <Input
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          mr={2}
        />
        <Button onClick={addTask} colorScheme="teal">
          Add Task
        </Button>
      </Flex>
      <List spacing={3}>
        {tasks.map((task, index) => (
          <ListItem key={index} p={2} borderWidth="1px" borderRadius="md">
            <Flex align="center">
              <Checkbox
                isChecked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
                mr={2}
              />
              {editingTask === index ? (
                <Input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  mr={2}
                />
              ) : (
                <Text
                  as={task.completed ? "s" : ""}
                  flex="1"
                  mr={2}
                >
                  {task.text}
                </Text>
              )}
              {editingTask === index ? (
                <Button onClick={() => saveTask(index)} colorScheme="teal" mr={2}>
                  Save
                </Button>
              ) : (
                <IconButton
                  icon={<FaEdit />}
                  onClick={() => editTask(index)}
                  mr={2}
                />
              )}
              <IconButton
                icon={<FaTrash />}
                onClick={() => deleteTask(index)}
                colorScheme="red"
              />
            </Flex>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Index;