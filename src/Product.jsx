import React, { useState } from "react";

const Product = ({
  product = {
    id: 1,
    name: "Product Name",
    html_url: "#",
    images: [
      {
        image: {
          full_size: "https://via.placeholder.com/400",
          alt_text: "Product image",
        },
      },
    ],
    price: 100,
    sale_price: null,
    formatted_price: "$100.00",
    formatted_sale_price: null,
    has_options: false,
    unavailable: false,
    out_of_stock: false,
    is_infinite: true,
    quantity: 10,
    badge: null,
  },
  productColor = "#fff",
  customLabel = null,
  onQuickView = (productId) => console.log("Quick view:", productId),
  onAddToCart = (productId) => console.log("Add to cart:", productId),
  onViewProduct = (url) => (window.location.href = url),
  locals = {
    quick_view: "Quick View",
    add_to_cart: "Add to Cart",
    view_product: "View Product",
    out_of_stock: "Out of Stock",
  },
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const calculateDiscount = () => {
    if (product.sale_price && product.price) {
      return Math.round(
        ((product.price - product.sale_price) / product.price) * 100
      );
    }
    return 0;
  };

  const discount = calculateDiscount();
  const isDisabled =
    product.unavailable ||
    product.out_of_stock ||
    (product.is_infinite === false && product.quantity === 0);
  const primaryImage =
    product.images?.[0]?.image?.full_size || "https://via.placeholder.com/400";
  const secondaryImage =
    product.images?.length > 1
      ? product.images[1].image.full_size
      : primaryImage;
  const primaryImageAlt = product.images?.[0]?.image?.alt_text || "Product";
  const secondaryImageAlt =
    product.images?.length > 1
      ? product.images[1].image.alt_text
      : primaryImageAlt;

  const handleQuickView = async (e) => {
    e.preventDefault();
    if (onQuickView) {
      setIsLoading(true);
      await onQuickView(product.id);
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (isDisabled) return;
    if (onAddToCart) {
      setIsLoading(true);
      await onAddToCart(product.id);
      setIsLoading(false);
    }
  };

  return (
    <li
      className="product instock product-with-flip relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Thumbnail */}
      <div className="product-thumbnail relative overflow-hidden rounded-t-[15px]">
        {/* SVG Background Decoration */}
        <div className="svg-image-holder absolute top-[52%] left-0 right-0 mx-auto w-full h-[51%] z-[2]">
          <svg
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 248 130"
            preserveAspectRatio="xMidYMid meet"
          >
            <title>image</title>
            <path
              fill="#ffffff"
              d="M225.2 20.9c0 56.1-45.5 101.6-101.6 101.6S22 77 22 20.9C22-35.3 67.5-80.8 123.6-80.8S225.2-35.3 225.2 20.9z"
            />
            <path
              fill={productColor}
              d="M225 20.6c0 55-45.4 99.6-101.5 99.6S22 75.6 22 20.6C22-34.4 67.4-79.1 123.5-79.1S225  -34.4 225 20.6z"
            />
            <path
              fill="#7c7c7c17"
              d="M225 20.6c0 55-45.4 99.6-101.5 99.6S22 75.6 22 20.6C22-34.4 67.4-79.1 123.5-79.1S225 -34.4 225 20.6z"
            />
          </svg>
        </div>

        <a href={product.html_url} className="block relative">
          {/* Product Background */}
          <div
            className="product-bg absolute bottom-0 w-full h-[48%] z-[1] rounded-t-[15px] -mb-[1px]"
            style={{ backgroundColor: productColor }}
          />

          {/* Primary Image */}
          <img
            src={primaryImage}
            alt={primaryImageAlt}
            className="block w-full -mt-[2px] object-cover aspect-square h-auto p-[29px] z-[10] relative rounded-t-[15px] md:h-[300px]"
          />

          {/* Secondary Image (on hover) */}
          <div
            className={`product-additional absolute top-0 left-0 right-0 bottom-0 opacity-0 transition-all duration-400 z-[2] ${
              isHovered
                ? "opacity-100 visible scale-100"
                : "opacity-0 invisible scale-x-0"
            }`}
          >
            <img
              src={secondaryImage}
              alt={secondaryImageAlt}
              className="block w-full -mt-[2px] object-cover aspect-square h-auto p-[29px] z-[10] relative rounded-t-[15px]"
            />
          </div>
        </a>
      </div>

      {/* Product Inner */}
      <div
        className="product-inner bg-white rounded-b-[15px] flex items-end w-full justify-center relative"
        style={{ backgroundColor: productColor }}
      >
        <div className="product-summary relative w-full">
          {/* Product Title and Price */}
          <div className="row px-2.5">
            <div className="col">
              <div className="loop-product__title block text-sm leading-[1.5] mt-2.5 px-2.5">
                <a
                  href={product.html_url}
                  className="font-semibold text-xl text-[#494949] hover:no-underline"
                >
                  {product.name}
                </a>
              </div>

              <p className="price h-[35px] text-[#5f5f5f] mb-0 flex items-center justify-center">
                {product.sale_price ? (
                  <span className="amount price_range flex items-center justify-center rtl:flex-row-reverse">
                    <del className="product-old-price text-[#878787] text-xs md:text-sm mr-2.5">
                      {product.formatted_price}
                    </del>
                    <ins className="product-price text-black text-xl md:text-[22px] not-italic">
                      {product.formatted_sale_price}
                    </ins>
                  </span>
                ) : (
                  <span className="amount">
                    <ins className="product-old-price text-black text-xl md:text-[22px] not-italic">
                      {product.formatted_price}
                    </ins>
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Product Badges */}
          <span className="products-badges products-badges--round flex justify-between box-border w-full bottom-[45px] z-[5] ltr:flex-row rtl:flex-row-reverse relative">
            {customLabel && (
              <span className="custom-label products-badge left-0 w-auto text-center font-[var(--font-family)] bg-[#e9b51c] w-[50px] h-[30px] leading-none rounded text-xs flex items-center justify-center">
                {customLabel}
              </span>
            )}

            {product.sale_price && discount > 0 && (
              <span className="onsale products-badge right-0 ml-auto text-center relative rounded-md rounded-r-none rounded-br-none bg-[var(--main-color)] w-[50px] h-[30px] leading-none text-xs flex items-center justify-center text-white">
                <span>{discount}%</span>
              </span>
            )}
          </span>

          {/* Action Buttons */}
          <div className="clearfix buttons relative justify-around flex items-end ltr:flex-row rtl:flex-row-reverse w-full opacity-100 transform-none rounded-[15px_0_15px_0] mt-1.5">
            {/* Quick View Button */}
            <a
              href="#"
              onClick={handleQuickView}
              className="button quick-view-button flex justify-center items-center text-black bg-transparent p-0 w-[25%] h-[35px] mt-1.5"
              rel="nofollow"
            >
              <span className="screen-reader-text button-text sr-only">
                {locals.quick_view}
              </span>
              <span className="svg-icon icon-eye size-normal">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <g>
                    <g>
                      <circle cx="12" cy="12" r="2" fill="currentColor" />
                      <path
                        d="M16.466,6.748C15.238,5.583,13.619,5,12,5S8.762,5.583,7.534,6.748L2,12l5.534,5.252C8.762,18.417,10.381,19,12,19 s3.238-0.583,4.466-1.748L22,12L16.466,6.748z M15.089,15.801C14.274,16.574,13.177,17,12,17s-2.274-0.426-3.089-1.199L4.905,12 l4.005-3.801C9.726,7.426,10.823,7,12,7s2.274,0.426,3.089,1.199L19.095,12L15.089,15.801z"
                        fill="currentColor"
                      />
                    </g>
                    <rect fill="none" width="24" height="24" />
                  </g>
                </svg>
              </span>
            </a>

            {/* Add to Cart / View Product / Out of Stock Button */}
            {product.has_options ? (
              <a
                href={product.html_url}
                onClick={(e) => {
                  e.preventDefault();
                  onViewProduct(product.html_url);
                }}
                className="button pr_view_product bg-[var(--main-color)] text-white py-5 leading-[0.6] m-0 h-[46px] w-[75%] rounded-[15px_0_15px_0] flex items-center justify-center text-sm md:text-base font-[var(--font-family)]"
              >
                {locals.view_product}
              </a>
            ) : isDisabled ? (
              <a
                href="javascript:void(0)"
                className="button pr_out_of_stock bg-[#cdcdcd] text-white m-0 rounded-[15px_0_15px_0] py-[15px] px-[18px] top-0 w-[75%] leading-none text-sm md:text-base font-[var(--font-family)] flex items-center justify-center"
                style={{ color: "red" }}
              >
                {locals.out_of_stock}
              </a>
            ) : (
              <a
                href="#"
                onClick={handleAddToCart}
                className={`ajax_add_to_cart button bg-black text-white p-2.5 -top-[5px] md:-top-[2px] leading-none w-[75%] text-sm md:text-base rounded-[15px_0_15px_0] font-[var(--font-family)] flex items-center justify-center ${
                  isLoading ? "loading" : ""
                }`}
              >
                {isLoading && (
                  <span className="loading-spinner inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1.5"></span>
                )}
                {locals.add_to_cart}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                >
                  <path
                    d="M18.774 14.0175C18.774 14.3403 18.6457 14.6497 18.4176 14.8778L12.8229 20.4725C12.5854 20.71 12.2742 20.8285 11.9627 20.8285C11.6515 20.8285 11.3403 20.71 11.1027 20.4725C10.6279 19.9974 10.6279 19.2274 11.1027 18.7523L15.855 14L11.1027 9.24771C10.6279 8.7726 10.6279 8.00263 11.1027 7.52752C11.5778 7.05241 12.3478 7.05241 12.8229 7.52752L18.4176 13.1222C18.6457 13.3503 18.774 13.6597 18.774 13.9825V14.0175ZM14 0C6.26789 0 0 6.26789 0 14C0 21.7321 6.26789 28 14 28C21.7321 28 28 21.7321 28 14C28 6.26789 21.7321 0 14 0Z"
                    fill="#171717"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Product;
