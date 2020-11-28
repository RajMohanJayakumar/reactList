import { useState, useEffect } from "react";

const Table = (props) => {

    const { itemsList, deleteEntries, resetEntries, updatePrice } = props;
    const [ items, setItem ] = useState(itemsList);
    let checkedItemsId = [];

    useEffect(() => {
        setItem([...itemsList]);
    }, [itemsList]);
    
    const searchItem = (event) => {
        setItem(itemsList.filter(item => item.name.includes(event.target.value)))
    }

    const updateCheckedItems = (event) => {
        if(checkedItemsId.includes(event.target.id)) {
            checkedItemsId = checkedItemsId.filter((itemId) => itemId !== event.target.id);
            return;
        }
        checkedItemsId.push(+event.target.id); // converting string to number using '+'
    }

    const delteCheckedItems = () => {
        deleteEntries(checkedItemsId);
        setItem(items.filter(item => !checkedItemsId.includes(item.id)));
    }

    const onPriceClick = (event) => {
        event.target.contentEditable = true;
    }

    const onPriceChange = (event) => {
        if(event.charCode === 13){
            updatePrice(event.target.value, event.target.innerText);
            event.target.contentEditable = false;
        }
    }

    return (
        <>
        <table>
            <thead>
            <tr>
                <th></th>
                <th>ID</th>
                <th>
                    <h3>name</h3>
                    <input onChange={searchItem} type="text" />

                </th>
                <th>price</th>
                <th>coupon</th>
                <th>In Stock</th>
            </tr>
            </thead>
            <tbody>
                {items.map((item) =>
                    <tr key={item.id} >
                        <td><input id={item.id} type="checkbox" onChange={updateCheckedItems} /></td>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td id={item.id} onClick={onPriceClick} onKeyPress={onPriceChange} >{item.price}</td>
                        <td>{item.coupon ? 'yes' : 'no'}</td>
                        <td>{item.inStock ? 'yes' : 'no'}</td>
                    </tr>
                )}
            </tbody>
        </table>
        <button onClick={delteCheckedItems}>Delete</button>
        <button onClick={resetEntries}>Reset</button>
        </>
    )
}

export default Table;
