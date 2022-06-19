import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiAlignRight, FiXCircle, FiChevronDown } from "react-icons/fi";

import logo from '../images/logo_465x320.png'
import "../styles/navbar.css"
import pp from '../images/anonyme.png'
const Navbar = () => {



    const [isMenu, setisMenu] = useState(false);
    const [isResponsiveclose, setResponsiveclose] = useState(false);
    const toggleClass = () => {
        setisMenu(isMenu === false ? true : false);
        setResponsiveclose(isResponsiveclose === false ? true : false);
    };
    function handleClick(e) {
        e.preventDefault();
        localStorage.removeItem("user");
        window.location.reload(false);
    }
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user.role);

    let boxClass = ["main-menu menu-right menuq1"];
    if (isMenu) {
        boxClass.push('menuq2');
    } else {
        boxClass.push('');
    }
    const [isMenuSubMenu, setMenuSubMenu] = useState(false);
    const [isMenuSubMenuMatchs, setMenuSubMenuMatchs] = useState(false);
    const [isMenuSubMenuProfil, setMenuSubMenuProfil] = useState(false);
    const [isMenuSubmenuClub, setMenuSubmenuClub] = useState(false);
    const [isMenuSubMenuEntrainement, setMenuSubMenuEntrainement] = useState(false);

    const toggleSubmenu = () => {
        setMenuSubMenu(isMenuSubMenu === false ? true : false);
        if (isMenuSubMenuMatchs) {
            setMenuSubMenuMatchs(false);
        }
        if (isMenuSubMenuProfil) {
            setMenuSubMenuProfil(false);
        }
        if (isMenuSubmenuClub) {
            setMenuSubmenuClub(false);
        }
        if (isMenuSubMenuEntrainement) {
            setMenuSubMenuEntrainement(false);
        }
    };
    const toggleSubmenuMatchs = () => {
        setMenuSubMenuMatchs(isMenuSubMenuMatchs === false ? true : false);
        if (isMenuSubMenu) {
            setMenuSubMenu(false);
        }
        if (isMenuSubMenuProfil) {
            setMenuSubMenuProfil(false);
        }
        if (isMenuSubmenuClub) {
            setMenuSubmenuClub(false);
        }
        if (isMenuSubMenuEntrainement) {
            setMenuSubMenuEntrainement(false);
        }
    };

    const toggleSubmenuProfil = () => {
        setMenuSubMenuProfil(isMenuSubMenuProfil === false ? true : false);
        if (isMenuSubMenu) {
            setMenuSubMenu(false);
        }
        if (isMenuSubMenuMatchs) {
            setMenuSubMenuMatchs(false);
        }
        if (isMenuSubmenuClub) {
            setMenuSubmenuClub(false);
        }
        if (isMenuSubMenuEntrainement) {
            setMenuSubMenuEntrainement(false);
        }
    };

    const toggleSubmenuClub = () => {
        setMenuSubmenuClub(isMenuSubmenuClub === false ? true : false);
        if (isMenuSubMenu) {
            setMenuSubMenu(false);
        }
        if (isMenuSubMenuMatchs) {
            setMenuSubMenuMatchs(false);
        }
        if (isMenuSubMenuProfil) {
            setMenuSubMenuProfil(false);
        }
        if (isMenuSubMenuEntrainement) {
            setMenuSubMenuEntrainement(false);
        }
    };
    const toggleSubmenuEntrainement = () => {
        setMenuSubMenuEntrainement(isMenuSubMenuEntrainement === false ? true : false);
        if (isMenuSubMenu) {
            setMenuSubMenu(false);
        }
        if (isMenuSubMenuMatchs) {
            setMenuSubMenuMatchs(false);
        }
        if (isMenuSubMenuProfil) {
            setMenuSubMenuProfil(false);
        }
        if (isMenuSubmenuClub) {
            setMenuSubmenuClub(false);
        }
    };


    let boxClassSubMenu = ["sub__menus"];
    let boxClassSubMenuProfile = ["sub__menus"]
    let boxClassSubMenuMatchs = ["sub__menus"]
    let boxClassSubmenuClub = ["sub__menus"]
    let boxClassSubMenuEntrainement = ["sub__menus"]
    if (isMenuSubMenu) {
        boxClassSubMenu.push('sub__menus__Active');
    } else {
        boxClassSubMenu.push('');
    }

    if (isMenuSubMenuProfil) {
        boxClassSubMenuProfile.push('sub__menus__Active');
    } else {
        boxClassSubMenuProfile.push('');
    }

    if (isMenuSubMenuMatchs) {
        boxClassSubMenuMatchs.push('sub__menus__Active');
    } else {
        boxClassSubMenuMatchs.push('');
    }

    if (isMenuSubmenuClub) {
        boxClassSubmenuClub.push('sub__menus__Active');
    } else {
        boxClassSubmenuClub.push('');
    }
    if (isMenuSubMenuEntrainement) {
        boxClassSubMenuEntrainement.push('sub__menus__Active');
    } else {
        boxClassSubMenuEntrainement.push('');
    }
    return (
        <div className='absolute w-full '>

            <header className="header__middle">
                <div className="container">
                    <div className="row">
                        {/* Add Logo  */}
                        <div className="header__middle__logo">
                            <NavLink exact activeClassName='is-active' to="/">
                                <img src={logo} className="mr-3 h-12 lg:h-10" alt="logo" />
                            </NavLink>
                        </div>
                        <div className="header__middle__menus">
                            <nav className="main-nav " >
                                {/* Responsive Menu Button */}
                                {isResponsiveclose === true ? <>
                                    <span className="menubar__button" style={{ display: 'none' }} onClick={toggleClass} > <FiXCircle />   </span>
                                </> : <>
                                    <span className="menubar__button" style={{ display: 'none' }} onClick={toggleClass} > <FiAlignRight />   </span>
                                </>}
                                <ul className={boxClass.join(' ')}>
                                    <li onClick={toggleSubmenuMatchs} className="menu-item sub__menus__arrows" > <Link to="#"> <FiChevronDown /> Matchs </Link>
                                        <ul className={boxClassSubMenuMatchs.join(' ')} >
                                            <li> <NavLink onClick={toggleClass} activeClassName='is-active' to={`/match_a_venir`}> Matchs à venir </NavLink> </li>
                                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/matchs_en_cours`}> Matchs en cours </NavLink> </li>
                                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/match_termine`}> Matchs terminés </NavLink> </li>
                                        </ul>
                                    </li>
                                    <li className="menu-item " ><NavLink onClick={toggleClass} activeClassName='is-active' to={`/performance_joueur`}> Joueur</NavLink> </li>
                                    <li className="menu-item " ><NavLink onClick={toggleClass} activeClassName='is-active' to={`/club`}> Club </NavLink> </li>
                                    <li className="menu-item " ><NavLink onClick={toggleClass} activeClassName='is-active' to={`/arbitre`}> Arbitre </NavLink> </li>
                                    <li onClick={toggleSubmenu} className="menu-item sub__menus__arrows" > <Link to="#"> <FiChevronDown /> Classement </Link>
                                        <ul className={boxClassSubMenu.join(' ')} >

                                            <li> <NavLink onClick={toggleClass} activeClassName='is-active' to={`/classement`}>  Classement Equipe </NavLink> </li>
                                            <li> <NavLink onClick={toggleClass} activeClassName='is-active' to={`/meilleur_joueur`}> Meilleur joueur </NavLink> </li>
                                            <li> <NavLink onClick={toggleClass} activeClassName='is-active' to={`/meilleure_composition`}>  Meilleur Composition </NavLink> </li>
                                        </ul>
                                    </li>

                                    {(() => {
                                        if (user.role === "club") {
                                            return (
                                                    <li className="menu-item " ><NavLink onClick={toggleClass} activeClassName='is-active' to={`/`}> Gestion du club </NavLink> </li>
                                                )
                                            }
                                        })()}
                                    {/* {(() => {
                                        if (user.role === "club") {
                                            return (<li onClick={toggleSubmenuClub} className="menu-item sub__menus__arrows" > <Link to="#"> <FiChevronDown /> Gestion du club </Link>
                                                <ul className={boxClassSubmenuClub.join(' ')} >
                                                    <li> <NavLink onClick={toggleClass} activeClassName='is-active' to={`/Online`}> Rechercher Equipe </NavLink> </li>
                                                    <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/meilleure_composition`}> Meilleur composition </NavLink> </li>
                                                </ul>
                                            </li>)
                                        }
                                    })()} */}


                                    {(() => {
                                        if (user.role === "entraineur") {
                                            return (<li onClick={toggleSubmenuEntrainement} className="menu-item sub__menus__arrows" > <Link to="#"> <FiChevronDown /> Gestion de l'équipe </Link>
                                                <ul className={boxClassSubMenuEntrainement.join(' ')} >
                                                    <li> <NavLink onClick={toggleClass} activeClassName='is-active' to={`/noter_entrainement`}> Noter Entraiement </NavLink> </li>
                                                    <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/paiement_facture`}> Etat des factures </NavLink> </li>
                                                    <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/ajouter_composition_liste`}> Ajouter composition </NavLink> </li>
                                                </ul>
                                            </li>)
                                        }
                                    })()}
                                    <li onClick={toggleSubmenuProfil} className="menu-item sub__menus__arrows" > <Link to="#">  <FiChevronDown /> </Link>
                                        <img src={pp} className="mr-3 h-12 ml-4 rounded-full lg:h-10 sub__menus__arrows menu-item" alt="logo" />
                                        <ul className={boxClassSubMenuProfile.join(' ')} >
                                            {(() => {
                                                if (user.role === "joueur") {
                                                    return (
                                                        <li> <NavLink onClick={toggleClass} activeClassName='is-active' to={`/profil_joueur`}> Mon profil </NavLink> </li>)
                                                }
                                            })()}

                                            {(() => {
                                                if (user.role === "entraineur") {
                                                    return (
                                                        <li> <NavLink onClick={toggleClass} activeClassName='is-active' to={`/profil_entraineur`}> Mon profil </NavLink> </li>)
                                                }
                                            })()}

                                            

                                            {(() => {
                                                if (user.role === "joueur") {
                                                    return (<li> <NavLink onClick={toggleClass} activeClassName='is-active' to={`/mon_calendrier`}> Mon calendrier </NavLink> </li>)
                                                }
                                            })()}
                                            <li><NavLink onClick={handleClick} activeClassName='is-active' to={`/`}> Se déconnecter </NavLink> </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}
export default Navbar;