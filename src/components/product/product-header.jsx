import React, { useEffect, useState } from "react";
import { getProductById, updateProduct } from "../../api/apiProduct";
import { getMaterialById } from "../../api/apiMaterial";

const ProductHeader = ({ prodId }) => {
  const [product, setProduct] = useState(null);
  const [material, setMaterial] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productData = await getProductById(prodId);
        setProduct(productData);

        if (productData.matId) {
          const materialData = await getMaterialById(productData.matId);
          setMaterial(materialData);
        }
      } catch (err) {
        console.error("Error fetching product or material data:", err);
        setError("Error fetching product or material data");
      }
    };

    fetchProductData();
  }, [prodId]);

  const handleNameChange = async (e) => {
    const newName = e.target.value;
    setProduct({ ...product, name: newName });

    try {
      await updateProduct(prodId, { ...product, name: newName });
    } catch (err) {
      console.error("Error updating product name:", err);
      setError("Error updating product name");
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!product || !material) {
    return <div>Loading...</div>;
  }

  return (
<div className="d-flex align-items-center justify-content-between">
  <div className="flex-grow-1 me-4">
    <input
      type="text"
      value={product.name}
      onChange={(e) => setProduct({ ...product, name: e.target.value })}
      onBlur={handleNameChange}
      className="form-control d-inline-block w-100"
    />
  </div>
  <div>
    <strong>Материал:</strong> {material.name}
  </div>
</div>
  );
};

export default ProductHeader;
