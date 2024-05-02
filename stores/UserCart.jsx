import React, { useState, useEffect } from 'react';
import Apicalls, { post_url } from '../Apicalls';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Carousel, Container, Row, Col, Button, Card, Modal, Navbar } from 'react-bootstrap';

import maximize from '../assets/maximize-2.png';
import buycard from '../assets/buycard.png';
import natural from '../assets/natural.png'
import gmo from '../assets/gmo.png'
import no_presetives from '../assets/no_presettives.png'
import gluten from '../assets/gulten_free.png'
import iconcard2 from '../assets/iconcard2.png';
import iconcard3 from '../assets/iconcard3.png';
import flagimg from '../assets/flagimg.png';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BuyProduct from '../Categorys/BuyProduct';
import ActionAreaCard from '../Ecommerce/MuiCard';


// import { Carousel, Container, Row, Col, Button, Card, Modal, Navbar } from 'react-bootstrap';




const UserCart = () => {

    const [cartItems, setCartItems] = useState([]);
    const user = useSelector((state) => state.user.auth.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user?.ID) {
            Promise.all([
                Apicalls.get('cart/user/' + user.ID)
            ]).then(([productsData]) => {
                productsData.data = productsData.data.map((item) => { item.userQuantity = 1; return item })
                setCartItems(productsData.data)
            }).catch((err) => {
                console.log(err)
            })
            localStorage.removeItem('cart_product_ids');
        }
        else {
            if (Array.isArray(JSON.parse(localStorage.getItem('cart_product_ids')))) {
                Promise.all([
                    Apicalls.post(`products/requiredProducts`, { productIds: JSON.parse(localStorage.getItem('cart_product_ids')) })
                ]).then(([data]) => {
                    setCartItems(data.data)
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }, []);

    const [quantity, setQuantity] = useState(1);
    const increment = (index) => {
        cartItems[index].userQuantity += 1
        console.log(cartItems)
        setCartItems([...cartItems])
    };

    const decrement = (index) => {
        if (cartItems[index].userQuantity > 1) {
            cartItems[index].userQuantity -= 1
            console.log(cartItems)
            setCartItems([...cartItems])
        }
    };

    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        } else {
            return text;
        }
    }


    function deleteCartItem(cartItem) {
        console.log(cartItem)
        if (user?.ID) {
            Promise.all([
                Apicalls.delete('cart/' + cartItem.cartID)
            ]).then(([productsData]) => {
                setCartItems(cartItems.filter((cart) => cart.ID !== cartItem.ID))
            }).catch((err) => {
                console.log(err)
            })
        }
        else {
            let cartItemsIds = JSON.parse(localStorage.getItem('cart_product_ids'));
            cartItemsIds = cartItemsIds.filter(id => id !== cartItem.ID)
            localStorage.setItem('cart_product_ids', JSON.stringify(cartItemsIds))
            console.log(cartItems.filter(item => item.ID !== cartItem.ID))
            setCartItems(cartItems.filter(item => item.ID !== cartItem.ID))
        }
    }

    return (
        <>
            <div className='d-none d-md-block'>
                <div className='container my-5'>
                    <h1 className='cart_Heading'> Shopping Cart</h1>
                </div>

                <section>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-2  '>
                                <p><strong>product</strong></p>
                            </div>
                            <div className='col-5  '>
                                <div className='row'>
                                    <div className=' col-md-7 col-xl-6 '>
                                        <p className=' '><strong>Details  </strong></p>

                                    </div>
                                    <div className=' text-center  col-md-5 col-xl-6'>
                                        <p className=' '><strong> Quantity</strong></p>
                                    </div>
                                </div>

                            </div>
                            <div className='col-4'>

                                <div className='row'>
                                    <div className='  col-md-6'>
                                        <p><strong>price</strong></p>
                                    </div>
                                    <div className='  col-md-6 '>
                                        <p><strong>  Total</strong></p>


                                    </div>
                                </div>
                            </div>
                            <div className='col-1'>
                                <p className=' '> <strong>  Remove</strong></p>
                            </div>
                        </div>


                        <hr></hr>
                    </div>
                </section>

                {cartItems.map((item, index) => (

                    <div key={index} className='container'>
                        <div className='row '>

                            <div className='col-2   d-flex flex-column justify-content-center'>
                                <img src={post_url + item.main_img} alt={post_url + item.main_img} className='  img-fluid' />
                            </div>

                            <div className='col-5 bth_text_div d-flex flex-column justify-content-center'>
                                <div className='row'>

                                    <div className=' col-md-7 col-xl-6 ' onClick={() => navigate('/product/' + item.ID)}>
                                        <p className='cardpara2 cardparaheading_cart'>{truncateText(item.heading, 22)}</p>
                                        <p className='cardpara1 cardparaheading_cart_title'>{item.title}</p>
                                    </div>

                                    <div className='  col-md-5 col-xl-6  only_for_padding_increment_btn'>

                                        <div className='containerquantity_btn'>

                                            <button onClick={() => decrement(index)} className='butt_in_dec' >-</button>
                                            <div className='num_quty' >{item.userQuantity}</div>
                                            <button onClick={() => increment(index)} className='butt_in_dec'  >+</button>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            <div className='col-4  d-flex flex-column justify-content-center'>
                                <div className='row'>
                                    <div className='  col-md-6'>

                                        <p className='cardpara3'>₹{item.price}</p>

                                    </div>

                                    <div className='  col-md-6 '>

                                        <p className='cart_page_price'>₹{(item.price * item.userQuantity)}</p>

                                    </div>
                                </div>
                            </div>

                            <div className='col-1 trash_icon d-flex flex-column justify-content-center'>

                                <i className="bi bi-trash" onClick={() => deleteCartItem(item)} style={{ fontSize: '2em' }}></i>

                            </div>

                            <hr></hr>
                        </div>


                    </div>



                ))}


                <div className='container'>
                    <div className='row'>
                        <div className='col-7  '>
                        </div>
                        <div className='col-2'>
                            <p className='chackout_text'>Subtotal :</p>
                            <p className='chackout_text'>Shipping :</p>

                        </div>
                        <div className='col-2'>
                            <p className='price_text'>₹695.00</p>
                            <p className='price_text'>₹100 </p>

                        </div>
                        <hr className='hr_length_cart'></hr>
                        <div className='col-1'>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-3  '>
                            <button className='contuinue_chopping'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
                                </svg>
                                Continue Shopping
                            </button>
                        </div>
                        <div className='col-3 d-flex'>
                            {/* <button className='applying_chopping'>
                                Apply Coupon
                            </button> */}

                            <input className='gift_input_cart_main_cart' placeholder='    Gift or discount code'></input>
                                <button className='apply_btn_gift_cart_main'>Apply</button>
                        </div>
                        <div className='col-1'>

                        </div>

                        <div className='col-2 d-flex flex-column justify-content-center'>

                            <p className='chackout_text'>Total :</p>
                        </div>
                        <div className='col-1 d-flex flex-column justify-content-center'>

                            <p className='price_text'>₹795.00</p>

                        </div>
                        <div className='col-2 text-end'>
                            <button className='checkout_chopping'>
                                checkout
                            </button>
                        </div>
                    </div>
                </div>

            </div>














            <div className='  d-md-none'>
                <div className='container my-3 text-center'>
                    <h1 className='cart_Heading_sm'> Shopping Cart</h1>
                </div>

                <section>
                    <div className='container '>
                        <div className='row  '>
                            <div className='col-6 text-center '>
                                {/* <p><strong>product</strong></p> */}
                            </div>
                            <div className='col-6  text-center '>

                                {/* <p className=' '><strong>Details</strong></p> */}


                            </div>

                        </div>


                        <hr></hr>
                    </div>
                </section>

                {cartItems.map((item, index) => (

                    <div key={index} className='container'>
                        <div className='row '>

                            <div className='col-3  d-flex flex-column justify-content-center'>
                                <img src={post_url + item.main_img} alt={post_url + item.main_img} className=' add_cart_img  img-fluid   ' />
                            </div>

                            <div className='col-9  bth_text_div_md d-flex  '>

                                <div className='row'>

                                    <div className='col-10'>
                                        <p className='cardpara2_md_dvi'>{truncateText(item.heading, 22)}</p>
                                        <p className='cardpara_md_dvi'>{truncateText(item.title, 18)}</p>
                                    </div>

                                    <div className='col-2  '>
                                        <i className="bi bi-trash"  onClick={() => deleteCartItem(item)} style={{ fontSize: '1.3em' }}></i>
                                    </div>


                                    <div className='col-6 secontd_row_top'>
                                        <p className='cart_page_price'>₹{item.price * item.userQuantity}</p>
                                    </div>

                                    <div className='col-6 secontd_row_top   d-flex flex-row justify-content-end'>

                                        <div className='containerquantity_btn_mini'>
                                            <button onClick={() => decrement(index)} className='butt_in_dec_mini' >-</button>
                                            <div className='num_quty_mini' >{item.userQuantity}</div>
                                            <button onClick={() => increment(index)} className='butt_in_dec_mini'  >+</button>
                                        </div>

                                    </div>

                                </div>

                            </div>

                            <hr></hr>
                        </div>
                    </div>

                ))}

                <section className=' '>
                    <div className='container'>
                        <div className='row'>
                            {/* <div className=' d-flex  sub_total_div'>
                                <input type="text" class="aply_coupen_in_md_cart" placeholder="    Gift or discount code">
                                </input>

                            </div> */}

                            <div className=' d-flex  sub_total_div my-4'>
                                <input className='gift_input' placeholder='    Gift or discount code'></input>
                                <button className='apply_btn_gift'>Apply</button>
                            </div>

                        </div>
                        <div className=' d-flex flex-row justify-content-between  '>
                            <div className='  '>
                                <p className='md_totel_text'>  Total</p>
                                <p className='free_deleivry_md'> Shipping & taxes may br re-calculated at checkout</p>
                                   
                               
                            </div>
                            <div className=''>
                                <p className='price_text_md '>₹695.00</p>
                              

                            </div>
                        </div>
                        <div className='row     '>
                            <div className='col-12  mb-4 layout_butnd'>
                                <button className='checkout_btn_md'>
                                    Proced to checkout
                                </button>
                            </div>

                            <div className='col-12  mb-4 layout_butnd'>
                                <button className='continue_btn_md'>
                                    
                                   Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default UserCart