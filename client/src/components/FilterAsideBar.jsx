import { GlobalContext } from "../context/globalcontext";
import { useContext } from "react";

function FilterAsideBar() {

    const { allCategories, setFilter, filter } = useContext(GlobalContext);
    function clearFilter(e) {
        e.preventDefault();
        setFilter({
            category: [],
            minPrice: "",
            maxPrice: ""
        })
    }


    return (
        <div className="p-3 border rounded shadow-sm bg-light">

            <h4 className="mb-3">Filters</h4>
            <hr />

            <h5 className="mt-3 mb-2">Price Range (₹)</h5>
            <div className="d-flex gap-2 mb-3">
                <input
                    type="number"
                    className="form-control"
                    placeholder="Min"
                    min="0"
                    value={filter.minPrice}
                    onChange={(e) =>
                        setFilter(prev => ({
                            ...prev,
                            minPrice: e.target.value === "" ? "" : Number(e.target.value)
                        }))
                    }
                />
                <input
                    type="number"
                    className="form-control"
                    placeholder="Max"
                    min="0"
                    value={filter.maxPrice}
                    onChange={(e) => setFilter((prev) => ({ ...prev, maxPrice: e.target.value === "" ? "" : Number(e.target.value) }))}
                />
            </div>

            <hr />

            <h5 className="mt-3 mb-2">Category</h5>
            {allCategories.map((cat, index) => (
                <div className="form-check" key={index}>
                    <input value={cat} className="form-check-input" type="checkbox" id={`cat-${index}`} checked={filter.category.includes(cat)} onChange={(e) => {
                        const value = e.target.value;
                        setFilter(prev => ({
                            ...prev,
                            category: e.target.checked
                                ? [...prev.category, value]
                                : prev.category.filter(c => c !== value)
                        }));
                    }} />
                    <label className="form-check-label" htmlFor={`cat-${index}`}>
                        {cat}
                    </label>
                </div>
            ))

            }

            <hr></hr>
            <button onClick={clearFilter} >Clear Filters</button>

        </div>
    );
}

export default FilterAsideBar;