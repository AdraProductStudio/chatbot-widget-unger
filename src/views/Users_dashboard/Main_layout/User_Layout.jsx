import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import store from '../../../StoreIndex';
import Images from '../../../Utils/Image';
import JsonData from '../../../Utils/JsonData';
import Header from '../../../components/Panel_compnent/Header';
import Sidebar from '../../../components/Panel_compnent/Sidebar';
import { handleUpdateCanvasShow } from '../../../Redux/Actions/Common_actions/Common_action';
import { useDispatch } from '../../../components/CustomHooks';


const User_Layout = () => {
    const state = store.getState()
    const dispatch = useDispatch();
    const handleCanvasOpenOrClose = () => dispatch(handleUpdateCanvasShow)
    const clientMenuOptions = JsonData()?.jsxJson?.clientMenuOptions;


    useEffect(() => {
        if (state?.commonState?.innerWidth >= 1200 && state?.commonState?.canvasShow) {
            dispatch(handleUpdateCanvasShow)
        }
    }, [state?.commonState?.innerWidth])

    return (
        <div className="d-flex flex-wrap">
            <Sidebar
                responsiveOn={"xl"}
                offCanvasShow={state?.commonState?.canvasShow}
                handleCanvasOpenOrClose={handleCanvasOpenOrClose}
                menuOptions={clientMenuOptions}
                header={true}
                companyLogo={Images.CompanyLogo}
                componentFrom="client"
            />

            <div className="col overflow-hidden">
                <main className="main w-100 px-md-2">
                    <div className="container-fluid h-100">
                        {/* header  */}
                        <header className='d-flex align-items-center'>
                            <Header
                                offcanvasOn={"xl"}
                                offcanvasOnButton={handleCanvasOpenOrClose}
                                componentFrom="client"
                            />
                        </header>

                        {/* main content  */}
                        <div className="w-100 main_rendering_contents_height">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default User_Layout