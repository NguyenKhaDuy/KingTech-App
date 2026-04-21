import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ItemCard from "../ItemCard/ItemCard";

export default function ItemList({ items, setItems }) {

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  return (
    <>
      <Text style={styles.section}>Vật liệu</Text>

      {items.map((item, index) => (
        <ItemCard
          key={index}
          item={item}
          onChange={(field, value) =>
            updateItem(index, field, value)
          }
          onRemove={() => removeItem(index)}
        />
      ))}

      <TouchableOpacity style={styles.addBtn} onPress={addItem}>
        <Text>+ Thêm vật liệu</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 15, fontWeight: "bold", fontSize: 16 },
  addBtn: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
    alignItems: "center",
  },
});