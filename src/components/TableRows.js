function TableRows({ rowsData, deleteTableRows, handleChange }) {


    return (

        rowsData.map((data, index) => {
            const { flavor, quantity } = data;
            return (

                <tr key={index}>
                    <td>
                        <input type="text" defaultValue={flavor} onChange={(evnt) => (handleChange(index, evnt))} name="flavor" className="form-control" />
                    </td>
                    <td><input type="text" defaultValue={quantity} onChange={(evnt) => (handleChange(index, evnt))} name="quantity" className="form-control" /> </td>
                    <td><button className="btn btn-outline-danger" onClick={() => (deleteTableRows(index))}>x</button></td>
                </tr>

            )
        })

    )

}

export default TableRows;