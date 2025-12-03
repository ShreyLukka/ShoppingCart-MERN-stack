import { GlobalContext } from "../context/globalcontext";
import ProductCard from "../components/ProductCard";
import { useContext } from "react"
import FilterAsideBar from "../components/FilterAsideBar";

function ProductList() {

    const { productList, setPage, page, totalPages } = useContext(GlobalContext);

    return (

        <div className="container-fluid mt-4">

            <div className="row">
                <div className="col-12 col-sm-4 col-md-3 col-lg-2">
                    <FilterAsideBar />
                </div>

                <div className="col-12 col-sm-8 col-md-9 col-lg-10">
                    <h2 className="mb-4 text-center">Products</h2>
                    <div className="row">
                        {productList.map((item) => (
                            <ProductCard
                                key={item._id}
                                product={item}

                            />
                        ))}
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                        <button
                            disabled={page === 1}
                            className="btn btn-secondary me-2"
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={() => setPage(page + 1)}
                            disabled={page >= totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList;