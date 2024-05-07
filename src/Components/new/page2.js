import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page2.css";
import Page1 from "../main/page1";

function Page2({ onSave }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    date: "",
    items: [],
    totalPrice: 0,
    totalTax: 0,
    grandTotal: 0,
  });

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...formData.items];
    newItems[index][name] = value;

    const price = parseFloat(newItems[index].price) || 0;
    const tax = parseFloat(newItems[index].tax) || 0;
    const subtotal = (price + (price * tax) / 100).toFixed(2);
    newItems[index].subtotal = subtotal;

    const totalPrice = newItems.reduce(
      (acc, item) => acc + (parseFloat(item.price) || 0),
      0
    );

    const totalTax = newItems.reduce(
      (acc, item) =>
        acc + (parseFloat(item.subtotal) - parseFloat(item.price) || 0),
      0
    );

    const grandTotal = totalPrice + totalTax;

    setFormData({
      ...formData,
      items: newItems,
      totalPrice,
      totalTax,
      grandTotal,
    });
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { itemId: "", itemName: "", price: "", tax: "", subtotal: "" },
      ],
    });
  };

  const handleSaveClick = () => {
    onSave(formData);
    navigate("/", { state: formData });
  };

  return (
    <div className="container">
      <Page1 />
      <div className="container2">
        <div className="row2">
          <h2>Create Invoice</h2>
        </div>
        <div className="row2">
          <div className="inputContainer">
            <label>Invoice No:</label>
            <input
              type="text"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={(e) =>
                setFormData({ ...formData, invoiceNumber: e.target.value })
              }
            />
          </div>
          <div className="inputContainer">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>
          <button onClick={handleAddItem}>Add</button>
        </div>
        <div className="row2" style={{ backgroundColor: "#fbaeb4" }}>
          <div className="column2">Item ID</div>
          <div className="column2">Item Name</div>
          <div className="column2">Price</div>
          <div className="column2">Tax</div>
          <div className="column2">Sub Total</div>
        </div>
        {formData.items.map((item, index) => (
          <div className="row2" key={index}>
            <input
              type="text"
              name="itemId"
              value={item.itemId}
              onChange={(e) => handleInputChange(index, e)}
            />
            <input
              type="text"
              name="itemName"
              value={item.itemName}
              onChange={(e) => handleInputChange(index, e)}
            />
            <input
              type="text"
              name="price"
              value={item.price}
              onChange={(e) => handleInputChange(index, e)}
            />
            <input
              type="text"
              name="tax"
              value={item.tax}
              onChange={(e) => handleInputChange(index, e)}
            />
            <input type="text" name="subtotal" value={item.subtotal} readOnly />
          </div>
        ))}
        <div className="row23" style={{ width: "90%" }}>
          <div className="column21">Total Price:</div>
          <div className="column21">
            <input
              type="text"
              value={formData.totalPrice.toFixed(2)}
              readOnly
            />
          </div>
        </div>
        <div className="row23" style={{ width: "90%" }}>
          <div className="column21">Total Tax:</div>
          <div className="column21">
            <input type="text" value={formData.totalTax.toFixed(2)} readOnly />
          </div>
        </div>
        <div className="row23" style={{ width: "90%" }}>
          <div className="column21">Grand Total:</div>
          <div className="column21">
            <input
              type="text"
              value={formData.grandTotal.toFixed(2)}
              readOnly
            />
          </div>
        </div>
        <div className="row2">
          <button onClick={handleSaveClick}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default Page2;
