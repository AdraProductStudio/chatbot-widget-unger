import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Img from '../Img/Img';
import NavLinkComp from '../Router_components/NavLink';
import OffCanvas from '../Offcanvas/OffCanvas';
import { handleCurrentMenuInd, handleLogout } from '../../Redux/Actions/Common_actions/Common_action';
import Icons from '../../Utils/Icons';
import Image from '../../Utils/Image';
import store from '../../StoreIndex';



const Sidebar = ({
    componentFrom,
    menuOptions,
    responsiveOn,
    offCanvasShow,
    handleCanvasOpenOrClose,

    header,
    companyLogo,

}) => {
    const state = store.getState()
    const { configurationFlowState, reportsState } = useSelector((state) => state)
    const { currentNavMenuIndex, selected_service_progress, edit_from } = useSelector((state) => state.commonState);
    const dispatch = useDispatch();

    //admin functions
    const handleDynamicTab = () => {
        const a = window.location.pathname.split('/')
        const b = a[a.length - 1]

        dispatch(handleCurrentMenuInd(menuOptions, b))
    }

    const hanldeButton = (v) => {
        return <>
            <div className="col-3 pb-1 text-center">
                {v.icon}
            </div>
            <div className="col text-start">
                <p className='mb-0'>{v.name}</p>
            </div>
        </>
    }
    const headerFun = (width, height, image) => {
        return <Img
            src={image}
            alt='company logo'
            width={width}
            height={height}
        />
    }

    const bodyContent = () => {
        return <nav className='navmenu h-100 w-100'>
            <ul className='h-100 w-100 d-flex flex-wrap justify-content-around'>
                {menuOptions.map((v, i) => (
                    <li className={`list-unstyled w-100 ${i < currentNavMenuIndex && selected_service_progress?.length ?
                        selected_service_progress?.length ?
                            selected_service_progress.includes(v?.accessable_page_name) ?
                                'navmenu-active'
                                : ''
                            :
                            'navmenu-active'
                        :
                        ''
                        } 
                        ${i === menuOptions.length - 1 ? 'setnavlink-height-zero' : ''}
                        ${state?.commonState?.currentNavMenuIndex === menuOptions.length || (state?.commonState?.nextButton && state?.commonState?.edited) || state?.clientDetailsState?.initialGlow || state?.serviceDetailsState?.initialGlow || state?.commonState?.submitted || configurationFlowState?.initialGlow || state?.integrationSpecState?.initialGlow || state?.integrationSpecState?.integrationSpecAddOrEditApiGlow || reportsState?.initialGlow || reportsState?.addReport || state?.determineCriteriaState?.nextButton || state?.determineCriteriaState?.initialGlow || state?.determineCriteriaState?.skipSpinner || state?.reportsState?.previewGlow || state?.sandboxState?.apiGlow || state?.configurationFlowState?.configApiGlow ?
                            "pe-none text-muted" : ''
                        }`} key={i}>

                        <div className={`navmenu-icons ${i < currentNavMenuIndex ? 'navmenu-active' : ''}`}>
                            {
                                i === currentNavMenuIndex || selected_service_progress?.length ?
                                    edit_from === v?.accessable_page_name ?
                                        Icons.onActiveIcon
                                        :
                                        selected_service_progress.includes(v?.accessable_page_name) ?
                                            Icons.notVisitedIcon
                                            :
                                            Icons.visitedIcon
                                    :
                                    i < currentNavMenuIndex ?
                                        Icons.notVisitedIcon
                                        :
                                        Icons.visitedIcon

                            }
                        </div>
                        <div>
                            <NavLinkComp
                                componentFrom="sidebar menus"
                                className={`w-100 d-flex flex-wrap align-items-center mb-2 navlink-sidebar rounded p-2 text-decoration-none
                                    ${i < currentNavMenuIndex || selected_service_progress?.length ?
                                        selected_service_progress?.length ?
                                            selected_service_progress.includes(v?.accessable_page_name) ?
                                                ''
                                                : 'pe-none'
                                            :
                                            ''
                                        :
                                        'pe-none'
                                    }`}

                                title={hanldeButton(v)}
                                to={v.route}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </nav >
    }
    const bodyFun = (ifOffcanvas) => {
        return ifOffcanvas ?
            <div className="row justify-content-center h-100">
                <div className="col-11 h-100">
                    {bodyContent()}
                </div>

                <div className="offcanvas-sidebarCircleOne">
                    <Img src={Image.circleImageOne} width={"85%"} height={"85%"} />
                </div>

                <div className="offcanvas-sidebarCircleTwo">
                    <Img src={Image.circleImageTwo} width={"85%"} height={"85%"} />
                </div>

                <div className="offcanvas-sidebarCircleThree">
                    <Img src={Image.circleImageThree} width={"85%"} height={"85%"} />
                </div>
            </div>
            :
            bodyContent()
    }



    //client functions
    const clientBodyContent = (ifOffcanvas) => {
        return <nav className={`w-100 h-100 ${ifOffcanvas ? 'mt-4' : 'mt-0'}`}>
            <ul className='h-100 w-100 d-flex flex-wrap flex-column justify-content-between ps-0'>
                {menuOptions.map((v, i) => (
                    <li className="list-unstyled w-100 mt-3 sidebar-button-index" key={i}>
                        <div onClick={v.name === "Sign out" ? ()=>dispatch(handleLogout()) : null}>
                            <NavLinkComp
                                componentFrom="sidebar menus"
                                className="w-100 d-flex flex-wrap align-items-center mb-2 navlink-sidebar rounded p-2 text-decoration-none"
                                title={hanldeButton(v)}
                                to={v.route}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </nav >
    }
    const clienBodyFun = (ifOffcanvas) => {
        return ifOffcanvas ?
            <div className="row justify-content-end h-100">
                <div className="col-12 h-100">
                    {clientBodyContent(ifOffcanvas)}
                </div>

                <div className="offcanvas-sidebarCircleOne">
                    <Img src={Image.circleImageOne} width={"85%"} height={"85%"} />
                </div>

                <div className="offcanvas-sidebarCircleTwo">
                    <Img src={Image.circleImageTwo} width={"85%"} height={"85%"} />
                </div>

                <div className="offcanvas-sidebarCircleThree">
                    <Img src={Image.circleImageThree} width={"85%"} height={"85%"} />
                </div>
            </div>
            :
            clientBodyContent()
    }


    return (
        <>
            <div className={`sidebar d-none ${responsiveOn !== '' ? `d-${responsiveOn}-block` : 'd-block'}`}>
                <div className="container-fluid">
                    {/* header */}
                    {
                        header ?
                            <>
                                <div className="sidebar-header position-relative">
                                    <div className="row h-100 align-items-center justify-content-center sidebar-header-underline">
                                        <div className="col text-center">
                                            {headerFun('198px', '30px', companyLogo)}
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            null
                    }



                    {/* body */}
                    <div className={componentFrom !== "client" ? "sidebar-body-onboading" : "sidebar-body-without-footer"}>
                        {clienBodyFun()}
                    </div>
                </div>

                <div className="sidebarCircleOne">
                    <Img src={Image.circleImageOne} width={"90%"} height={"90%"} />
                </div>

                <div className="sidebarCircleTwo">
                    <Img src={Image.circleImageTwo} width={"90%"} height={"90%"} />
                </div>

                <div className="sidebarCircleThree">
                    <Img src={Image.circleImageThree} width={"90%"} height={"90%"} />
                </div>
            </div>


            <OffCanvas
                offCanvasShow={offCanvasShow}
                offcanvasPlacement="start"
                offcanvasClassname="rounded border-0 sidebar sidebar-offcanvas"
                handleCanvasOpenOrClose={handleCanvasOpenOrClose}
                canvasHeader={headerFun('198px', '33px', companyLogo)}
                offcanvasHeaderClassname="sidebar-header "
                offcanvasHeaderTitleClassname="col-11 text-center "
                offcanvasBodyClassname={"sidebar-body-without-footer mt-0"}
                canvasBody={clienBodyFun("offcanvas")}
            />
        </>
    )
}

export default Sidebar