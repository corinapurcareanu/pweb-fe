import {React} from "react"
import './header.css';
import { Link, useLocation } from 'react-router-dom';
import UserAuthComponent from '../../_auth/user.auth';
import { useNavigate } from 'react-router-dom';
import { useState , useEffect, useCallback} from 'react';
import ProductService from "../../_services/product.service";

export const Header = ({cartCount, setCartCount}) => {
    const location = useLocation();
    const [key, setKey] = useState('');
    const userAuthService = new UserAuthComponent();
    const navigate = useNavigate();

    const handleLogout = () => {
        userAuthService.clear();
        setCartCount(0);
        navigate('/');
    };

    const searchByKeyword = (event) => {
        event.preventDefault();
        console.log(key);
        navigate(`/search-view/${key}`)
        setKey('')
    };

    return (
    <div className="toolbar" role="banner">
        <table>
            <tr>
                <td align="left">
                    <span className="store">Beauty Products Store</span>
                </td>
                <td>
                    {/* Large windows size */}
                     <form className="search-bar" onSubmit={searchByKeyword}>
                        <input
                            type="text"
                            placeholder="Search for a product ..."
                            name="searchKey"
                            id="searchKey"
                            value={key}
                            onChange={(event) => setKey(event.target.value)}
                        />
                        <button type="submit">
                            <svg id="search-logo" xmlns="http://www.w3.org/2000/svg" width="17" height="27" fill="currentColor" className="bi bi-search" viewBox="0 0 16 18"> 
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" id="mainIconPathAttribute"></path>
                            </svg>
                        </button>
                        </form>
                        {/* Small windows size */}
                        <form className="search-bar-small" onSubmit={searchByKeyword}>
                        <input
                            type="text"
                            placeholder=""
                            name="searchKey"
                            id="searchKey"
                            value={key}
                            onChange={(event) => setKey(event.target.value)}
                        />
                        <button type="submit">
                            <svg id="search-logo" xmlns="http://www.w3.org/2000/svg" width="17" height="27" fill="currentColor" className="bi bi-search" viewBox="0 0 16 18"> 
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" id="mainIconPathAttribute"></path>
                            </svg>
                        </button>
                        </form>
                </td>
                <td></td>
                <td align="right" style={{marginRight: '10px'}}>
                    <Link to="/">
                    {location.pathname !== '/' ? (
                        <svg id="home-logo" data-name="Logo" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" fill="white"></path>
                        </svg>
                        ) : (
                        <svg id="home-logo-current" data-name="Logo" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" fill="white"></path>
                        </svg>
                        )
                    }
                    </Link>

                    <div className="dropdown">
                        <svg
                            id="user-logo"
                            data-name="Logo"
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                            fill="currentColor"
                            className="bi bi-person"
                            viewBox="0 0 16 16"
                        >
                            <rect width="400" height="400" fill="none" />
                            <path
                            d="M8,8a3,3,0,1,0,0-6,3,3,0,0,0,0,6zm2-3a2,2,0,1,1-4,0,2,2,0,0,1,4,0zm4,8c0,1-1,1-1,1H3s-1,0-1-1,1-4,6-4,6,3,6,4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516,10.68,10.289,10,8,10c-2.29,0-3.516.68-4.168,1.332-.678.678-.83,1.418-.832,1.664h10z"
                            fill="white"
                            ></path>
                        </svg>
                        <div className="dropdown-content">
                            {!userAuthService.isLoggedIn() ? (
                                <>
                                <Link to="/authenticate">
                                    <button className="authenticate">Log-in</button>
                                </Link>
                                <Link to="/sign-up">
                                    <button className="authenticate">Sign-up</button>
                                </Link>
                            </>
                            ) :
                            (
                                <button className="authenticate" onClick={handleLogout}> Log-out </button>
                            )}
                        </div>
                    </div>

                    <div style={{position: 'relative', display: 'inline-block'}}>
                        <Link to="cart">
                        {location.pathname !== 'cart' ? (
                            <svg id="shopping-logo" data-name="Logo"  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 600 572">
                                <path d="M171.7 191.1H404.3L322.7 35.07C316.6 23.31 321.2 8.821 332.9 2.706C344.7-3.409 359.2 1.167 365.3 12.93L458.4 191.1H544C561.7 191.1 576 206.3 576 223.1C576 241.7 561.7 255.1 544 255.1L492.1 463.5C484.1 492 459.4 512 430 512H145.1C116.6 512 91 492 83.88 463.5L32 255.1C14.33 255.1 0 241.7 0 223.1C0 206.3 14.33 191.1 32 191.1H117.6L210.7 12.93C216.8 1.167 231.3-3.409 243.1 2.706C254.8 8.821 259.4 23.31 253.3 35.07L171.7 191.1zM191.1 303.1C191.1 295.1 184.8 287.1 175.1 287.1C167.2 287.1 159.1 295.1 159.1 303.1V399.1C159.1 408.8 167.2 415.1 175.1 415.1C184.8 415.1 191.1 408.8 191.1 399.1V303.1zM271.1 303.1V399.1C271.1 408.8 279.2 415.1 287.1 415.1C296.8 415.1 304 408.8 304 399.1V303.1C304 295.1 296.8 287.1 287.1 287.1C279.2 287.1 271.1 295.1 271.1 303.1zM416 303.1C416 295.1 408.8 287.1 400 287.1C391.2 287.1 384 295.1 384 303.1V399.1C384 408.8 391.2 415.1 400 415.1C408.8 415.1 416 408.8 416 399.1V303.1z" fill="white"></path>
                            </svg>
                            ) : (
                            <svg id="shopping-logo-current" data-name="Logo"  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 600 572">
                                <path d="M171.7 191.1H404.3L322.7 35.07C316.6 23.31 321.2 8.821 332.9 2.706C344.7-3.409 359.2 1.167 365.3 12.93L458.4 191.1H544C561.7 191.1 576 206.3 576 223.1C576 241.7 561.7 255.1 544 255.1L492.1 463.5C484.1 492 459.4 512 430 512H145.1C116.6 512 91 492 83.88 463.5L32 255.1C14.33 255.1 0 241.7 0 223.1C0 206.3 14.33 191.1 32 191.1H117.6L210.7 12.93C216.8 1.167 231.3-3.409 243.1 2.706C254.8 8.821 259.4 23.31 253.3 35.07L171.7 191.1zM191.1 303.1C191.1 295.1 184.8 287.1 175.1 287.1C167.2 287.1 159.1 295.1 159.1 303.1V399.1C159.1 408.8 167.2 415.1 175.1 415.1C184.8 415.1 191.1 408.8 191.1 399.1V303.1zM271.1 303.1V399.1C271.1 408.8 279.2 415.1 287.1 415.1C296.8 415.1 304 408.8 304 399.1V303.1C304 295.1 296.8 287.1 287.1 287.1C279.2 287.1 271.1 295.1 271.1 303.1zM416 303.1C416 295.1 408.8 287.1 400 287.1C391.2 287.1 384 295.1 384 303.1V399.1C384 408.8 391.2 415.1 400 415.1C408.8 415.1 416 408.8 416 399.1V303.1z" fill="white"></path>
                            </svg>
                            )
                        }
                        </Link>

                        {cartCount !== 0 && (
                            <div className="cart_count">{cartCount}</div>
                        )}
                    </div>

                </td>
            </tr>

            <tr>
                <td align="left">
                    {/* Large window size */}
                <div className="products">
                    <div className="dropdown">
                    <Link to="/make-up">
                        {location.pathname !== '/make-up' ? (
                            <button className="dropbtn">Make-up</button>
                        ):(
                            <button className="dropbtn-current">Make-up</button>
                        )
                        }
                    </Link>
                        <div className="dropdown-content">
                            <table style={{width: 'max-content'}}>
                                <tr>
                                    <th><Link to="/make-up/face">Face</Link></th>
                                    <th><Link to="/make-up/eyes">Eyes</Link></th>
                                    <th><Link to="/make-up/eyebrows">Eyebrows</Link></th>
                                    <th><Link to="/make-up/lips">Lips</Link></th>
                                    <th><Link to="/make-up/nails">Nails</Link></th>
                                    <th><Link to="/make-up/brushes">Make-up brushes</Link></th>
                                </tr>
                                <tr>
                                    <td><Link to="/make-up/face/foundation">Foundation</Link></td>
                                    <td><Link to="/make-up/eyes/palette">Make-up palette</Link></td>
                                    <td><Link to="/make-up/eyebrows/eyebrows-pencil">Eyebrows pencil</Link></td>
                                    <td><Link to="/make-up/lips/lipstick">Lipstick</Link></td>
                                    <td><Link to="/make-up/nails/nail-polish">Nail polish</Link></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><Link to="/make-up/face/concealer">Concealer</Link></td>
                                    <td><Link to="/make-up/eyes/mascara">Mascara</Link></td>
                                    <td><Link to="/make-up/eyebrows/eyebrows-gel">Eyebrows gel</Link></td>
                                    <td><Link to="/make-up/lips/gloss">Gloss</Link></td>
                                    <td><Link to="/make-up/nails/nail-base">Nail base</Link></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><Link to="/make-up/face/face-powder">Face powder</Link></td>
                                    <td><Link to="/make-up/eyes/eyeliner">Eyeliner</Link></td>
                                    <td></td>
                                    <td><Link to="/make-up/lips/lip-pencil">Lip pencil</Link></td>
                                    <td><Link to="/make-up/nails/top-coat">Top coat</Link></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><Link to="/make-up/eyes/eye-pencil">Eye pencil</Link></td>
                                    <td></td>
                                    <td><Link to="/make-up/lips/lip-balm">Lip balm</Link></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><Link to="/make-up/eyes/lashes">False lashes</Link></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="dropdown">
                        <Link to="/perfume">
                            {location.pathname !== '/perfume' ? (
                                <button className="dropbtn">Perfume</button>
                            ):(
                                <button className="dropbtn-current">Perfume</button>
                            )
                            }
                        </Link>
                        <div className="dropdown-content">
                            <table style={{width: 'max-content'}}>
                                <tr>
                                    <th><Link to="/perfume/for-women">Perfumes for women</Link></th>
                                    <th><Link to="/perfume/for-men">Perfumes for men</Link></th>
                                </tr>
                                <tr>
                                    <td><Link to="/perfume/for-women/eau-de-parfume">Woman eau de parfume</Link></td>
                                    <td><Link to="/perfume/for-men/eau-de-parfume">Man eau de parfume</Link></td>
                                </tr>
                                <tr>
                                    <td><Link to="/perfume/for-women/eau-de-toalette">Woman eau de toalette</Link></td>
                                    <td><Link to="/perfume/for-men/eau-de-toalette">Man eau de toalette</Link></td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="dropdown">
                        <Link to="/skin-care">
                            {location.pathname !== '/skin-care' ? (
                                <button className="dropbtn">Skin care</button>
                            ):(
                                <button className="dropbtn-current">Skin care</button>
                            )
                            }
                        </Link>
                        <div className="dropdown-content">
                            <table style={{width: 'max-content'}}>
                                <tr>
                                    <th><Link to="/skin-care/face-care">Face care</Link></th>
                                    <th><Link to="/skin-care/body-care">Body care</Link></th>
                                    <th><Link to="/skin-care/hands-care">Hands care</Link></th>
                                    <th><Link to="/skin-care/feet-care">Feet care</Link></th>
                                </tr>
                                <tr>
                                    <td><Link to="/skin-care/face-care/day-cream">Day face cream</Link></td>
                                    <td><Link to="/skin-care/body-care/body-cream">Body cream</Link></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><Link to="/skin-care/face-care/night-cream">Night face cream</Link></td>
                                    <td><Link to="/skin-care/body-care/body-oil">Body oil</Link></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><Link to="/skin-care/face-care/face-mask">Face mask</Link></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="dropdown">
                        <Link to="/hair">
                            {location.pathname !== '/hair' ? (
                                <button className="dropbtn">Hair</button>
                            ):(
                                <button className="dropbtn-current">Hair</button>
                            )
                            }
                        </Link>
                        <div className="dropdown-content">
                            <table style={{width: 'max-content'}}>
                                <tr>
                                    <th><Link to="/hair/hair-care">Hair care</Link></th>
                                    <th><Link to="/hair/accesories">Accesories</Link></th>
                                    <th><Link to="/hair/styling">Styling</Link></th>
                                </tr>
                                <tr>
                                    <td><Link to="/hair/hair-care/shampoo">Shampoo</Link></td>
                                    <td><Link to="/hair/accesories/hair-tie">Hair tie</Link></td>
                                    <td><Link to="/hair/styling/hair-gel">Hair gel</Link></td>
                                </tr>
                                <tr>
                                    <td><Link to="/hair/hair-care/hair-balm">Hair balm</Link></td>
                                    <td><Link to="/hair/accesories/hair-brush">Hair brush</Link></td>
                                    <td><Link to="/hair/styling/hair-spray">Hair spray</Link></td>
                                </tr>
                                <tr>
                                    <td><Link to="/hair/hair-care/hair-mask">Hair mask</Link></td>
                                    <td><Link to="/hair/accesories/hair-pins">Hair pins</Link></td>
                                    <td><Link to="/hair/styling/hair-wax">Hair wax</Link></td>
                                </tr>
                                <tr>
                                    <td><Link to="/hair/hair-care/hair-oil">Hair oil</Link></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="dropdown">
                        <Link to="/bath">
                            {location.pathname !== '/bath' ? (
                                <button className="dropbtn">Bath</button>
                            ):(
                                <button className="dropbtn-current">Bath</button>
                            )
                            }
                        </Link>
                        <div className="dropdown-content">
                            <table style={{width: 'max-content'}}>
                                <tr>
                                    <th><Link to="/bath/shower-gel">Shower gel</Link></th>
                                </tr>
                                <tr>
                                    <th><Link to="/bath/shower-oil">Shower oil</Link></th>
                                </tr>
                                <tr>
                                    <th> <Link to="/bath/soap">Soap</Link></th>
                                </tr>
                                <tr>
                                    <th> <Link to="/bath/bath-salt">Bath salt</Link></th>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                </div>

                 {/* Small window size */}
                 <div className="small-dropdown">
                    <svg id="menu-logo" data-name="Logo" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" fill="white"></path>
                    </svg>
                    <div className="small-dropdown-content">
                        <div className="products-small">
                        <div className="dropdown">
                        <Link to="/make-up">
                            {location.pathname !== '/make-up' ? (
                                <button className="dropbtn-small">Make-up</button>
                            ):(
                                <button className="dropbtn-small-current">Make-up</button>
                            )
                            }
                        </Link>
                            <div className="dropdown-content">
                                <table style={{width: 'max-content'}}>
                                    <tr>
                                        <th><Link to="/make-up/face">Face</Link></th>
                                        <th><Link to="/make-up/eyes">Eyes</Link></th>
                                        <th><Link to="/make-up/eyebrows">Eyebrows</Link></th>
                                        <th><Link to="/make-up/lips">Lips</Link></th>
                                        <th><Link to="/make-up/nails">Nails</Link></th>
                                        <th><Link to="/make-up/brushes">Make-up brushes</Link></th>
                                    </tr>
                                    <tr>
                                        <td><Link to="/make-up/face/foundation">Foundation</Link></td>
                                        <td><Link to="/make-up/eyes/palette">Make-up palette</Link></td>
                                        <td><Link to="/make-up/eyebrows/eyebrows-pencil">Eyebrows pencil</Link></td>
                                        <td><Link to="/make-up/lips/lipstick">Lipstick</Link></td>
                                        <td><Link to="/make-up/nails/nail-polish">Nail polish</Link></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><Link to="/make-up/face/concealer">Concealer</Link></td>
                                        <td><Link to="/make-up/eyes/mascara">Mascara</Link></td>
                                        <td><Link to="/make-up/eyebrows/eyebrows-gel">Eyebrows gel</Link></td>
                                        <td><Link to="/make-up/lips/gloss">Gloss</Link></td>
                                        <td><Link to="/make-up/nails/nail-base">Nail base</Link></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><Link to="/make-up/face/face-powder">Face powder</Link></td>
                                        <td><Link to="/make-up/eyes/eyeliner">Eyeliner</Link></td>
                                        <td></td>
                                        <td><Link to="/make-up/lips/lip-pencil">Lip pencil</Link></td>
                                        <td><Link to="/make-up/nails/top-coat">Top coat</Link></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><Link to="/make-up/eyes/eye-pencil">Eye pencil</Link></td>
                                        <td></td>
                                        <td><Link to="/make-up/lips/lip-balm">Lip balm</Link></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><Link to="/make-up/eyes/lashes">False lashes</Link></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <div className="dropdown">
                            <Link to="/perfume">
                                {location.pathname !== '/perfume' ? (
                                    <button className="dropbtn-small">Perfume</button>
                                ):(
                                    <button className="dropbtn-small-current">Perfume</button>
                                )
                                }
                            </Link>
                            <div className="dropdown-content">
                                <table style={{width: 'max-content'}}>
                                    <tr>
                                        <th><Link to="/perfume/for-women">Perfumes for women</Link></th>
                                        <th><Link to="/perfume/for-men">Perfumes for men</Link></th>
                                    </tr>
                                    <tr>
                                        <td><Link to="/perfume/for-women/eau-de-parfume">Woman eau de parfume</Link></td>
                                        <td><Link to="/perfume/for-men/eau-de-parfume">Man eau de parfume</Link></td>
                                    </tr>
                                    <tr>
                                        <td><Link to="/perfume/for-women/eau-de-toalette">Woman eau de toalette</Link></td>
                                        <td><Link to="/perfume/for-men/eau-de-toalette">Man eau de toalette</Link></td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <div className="dropdown">
                            <Link to="/skin-care">
                                {location.pathname !== '/skin-care' ? (
                                    <button className="dropbtn-small">Skin care</button>
                                ):(
                                    <button className="dropbtn-small-current">Skin care</button>
                                )
                                }
                            </Link>
                            <div className="dropdown-content">
                                <table style={{width: 'max-content'}}>
                                    <tr>
                                        <th><Link to="/skin-care/face-care">Face care</Link></th>
                                        <th><Link to="/skin-care/body-care">Body care</Link></th>
                                        <th><Link to="/skin-care/hands-care">Hands care</Link></th>
                                        <th><Link to="/skin-care/feet-care">Feet care</Link></th>
                                    </tr>
                                    <tr>
                                        <td><Link to="/skin-care/face-care/day-cream">Day face cream</Link></td>
                                        <td><Link to="/skin-care/body-care/body-cream">Body cream</Link></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><Link to="/skin-care/face-care/night-cream">Night face cream</Link></td>
                                        <td><Link to="/skin-care/body-care/body-oil">Body oil</Link></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><Link to="/skin-care/face-care/face-mask">Face mask</Link></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <div className="dropdown">
                            <Link to="/hair">
                                {location.pathname !== '/hair' ? (
                                    <button className="dropbtn-small">Hair</button>
                                ):(
                                    <button className="dropbtn-small-current">Hair</button>
                                )
                                }
                            </Link>
                            <div className="dropdown-content">
                                <table style={{width: 'max-content'}}>
                                    <tr>
                                        <th><Link to="/hair/hair-care">Hair care</Link></th>
                                        <th><Link to="/hair/accesories">Accesories</Link></th>
                                        <th><Link to="/hair/styling">Styling</Link></th>
                                    </tr>
                                    <tr>
                                        <td><Link to="/hair/hair-care/shampoo">Shampoo</Link></td>
                                        <td><Link to="/hair/accesories/hair-tie">Hair tie</Link></td>
                                        <td><Link to="/hair/styling/hair-gel">Hair gel</Link></td>
                                    </tr>
                                    <tr>
                                        <td><Link to="/hair/hair-care/hair-balm">Hair balm</Link></td>
                                        <td><Link to="/hair/accesories/hair-brush">Hair brush</Link></td>
                                        <td><Link to="/hair/styling/hair-spray">Hair spray</Link></td>
                                    </tr>
                                    <tr>
                                        <td><Link to="/hair/hair-care/hair-mask">Hair mask</Link></td>
                                        <td><Link to="/hair/accesories/hair-pins">Hair pins</Link></td>
                                        <td><Link to="/hair/styling/hair-wax">Hair wax</Link></td>
                                    </tr>
                                    <tr>
                                        <td><Link to="/hair/hair-care/hair-oil">Hair oil</Link></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <div className="dropdown">
                            <Link to="/bath">
                                {location.pathname !== '/bath' ? (
                                    <button className="dropbtn-small">Bath</button>
                                ):(
                                    <button className="dropbtn-small-current">Bath</button>
                                )
                                }
                            </Link>
                            <div className="dropdown-content">
                                <table style={{width: 'max-content'}}>
                                    <tr>
                                        <th><Link to="/bath/shower-gel">Shower gel</Link></th>
                                    </tr>
                                    <tr>
                                        <th><Link to="/bath/shower-oil">Shower oil</Link></th>
                                    </tr>
                                    <tr>
                                        <th> <Link to="/bath/soap">Soap</Link></th>
                                    </tr>
                                    <tr>
                                        <th> <Link to="/bath/bath-salt">Bath salt</Link></th>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        
                        </div>
                    </div>
                </div>
                </td>
                <td></td>
                <td>
                {userAuthService.isAdmin() && (
                    <div className="dropdown">
                    <button className="admin-functions">Admin functions</button>
                    <div className="dropdown-content">
                        <table style={{ width: "max-content" }}>
                        <tr>
                            <th>
                            <Link to="/show-all-orders">Show all orders</Link>
                            </th>
                        </tr>
                        <tr>
                            <th>
                            <Link to="/show-product-details">Show products details</Link>
                            </th>
                        </tr>
                        <tr>
                            <th>
                            <Link to="/add-product">Add new product</Link>
                            </th>
                        </tr>
                        </table>
                    </div>
                    </div>
                )}

                {userAuthService.isLoggedIn() && !userAuthService.isAdmin() && (
                        <button className="user-functions" onClick={() => navigate('/my-orders')}>
                        My Orders
                        </button>
                )}
                </td>
                <td></td>
            </tr>
        </table>
    </div>
    );
};