// StAuth10244: I Aish Patel, 000902820 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    // Load TODO list on app startup
    useEffect(() => {
        axios.get('http://localhost:3001/load')
            .then(response => setTodos(response.data))
            .catch(error => console.error(error));
    }, []);

    // Add or edit TODO item
    const handleAddOrEdit = () => {
        if (text.trim() === '') return; // Prevent adding empty items

        if (editIndex !== null) {
            const updatedTodos = [...todos];
            updatedTodos[editIndex] = text;
            setTodos(updatedTodos);
            setEditIndex(null);
        } else {
            setTodos([...todos, text]); // Add new item at the end
        }
        setText('');
    };

    // Delete TODO item
    const handleDelete = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    // Save TODO list to backend
    const handleSave = () => {
        console.log('Saving todos:', todos);
        axios.post('http://localhost:3001/save', todos)
            .then(() => alert('Save successful'))
            .catch(error => console.error('Error saving:', error));
    };

    // Restore TODO list from backend
    const handleRestore = () => {
        axios.get('http://localhost:3001/load')
            .then(response => setTodos(response.data))
            .catch(error => console.error(error));
    };

    // Clear TODO list
    const handleClear = () => {
        axios.get('http://localhost:3001/clear')
            .then(() => setTodos([]))
            .catch(error => console.error(error));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button title="Save" onPress={handleSave} />
                <Button title="Restore" onPress={handleRestore} />
                <Button title="Clear" onPress={handleClear} />
            </View>

            <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder="Enter TODO item"
            />
            <Button title={editIndex !== null ? "Edit" : "Add"} onPress={handleAddOrEdit} />

            {/* Add some space between the button and the table */}
            <View style={styles.spacer} />

            <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>No.</Text>
                <Text style={styles.tableHeaderText}>TODO Item</Text>
                <Text style={styles.tableHeaderText}>Actions</Text>
            </View>

            <FlatList
                data={todos}
                renderItem={({ item, index }) => (
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>{index + 1}</Text>
                        <Text style={styles.tableCell}>{item}</Text>
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => handleDelete(index)}>
                                <Text style={styles.delete}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setText(item); setEditIndex(index); }}>
                                <Text style={styles.edit}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
    },
    spacer: { height: 20 }, // Add space between the button and the table
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        backgroundColor: '#ddd',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginTop: 30,
    },
    tableHeaderText: { fontWeight: 'bold', flex: 1, textAlign: 'center' },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    tableCell: { flex: 1, textAlign: 'center' },
    actions: { flexDirection: 'row', justifyContent: 'space-around', flex: 1 },
    delete: { color: 'red', marginRight: 10 },
    edit: { color: 'blue' },
});

export default App;
