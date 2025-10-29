import React from 'react';
import ButtonComponent from '../Button/Button';
import HeaderCard from '../Card/HeaderCard';
import Icons from '../../Utils/Icons';

import { useSelector } from 'react-redux';
import { useCustomNavigate, useDispatch } from '../CustomHooks';
import { handleLogout } from '../../Redux/Actions/Common_actions/Common_action';

const Header = ({
  offcanvasOn,
  offcanvasOnButton,
  componentFrom
}) => {
  const { currentMenuName } = useSelector((state) => state.commonState);
  const navigate = useCustomNavigate();
  const dispatch = useDispatch();


  const headerContentFunc = () => {
    return <>
      <div className={`col-12 d-flex flex-wrap align-items-center justify-content-between`}>
        <div className="col d-none d-md-inline-block">
          {currentMenuName}
        </div>

        <div className={`col-12 col-md-6 d-inline-flex flex-wrap justify-content-end `}>
          {
            componentFrom !== "client" ?
              <div className='d-inline-block'>
                <ButtonComponent
                  type="button"
                  className="px-3 me-xl-2 btn-brand-blue-color py-2"
                  clickFunction={() => navigate("/admin_dashboard/home")}
                  buttonName={
                    <span>
                      {Icons.homeIcon}
                      <span className='ms-2 d-none d-lg-inline-block'>Home</span>
                    </span>
                  }
                />
              </div>
              :
              null
          } 

          <ButtonComponent
            type="button"
            className="px-3 ms-2 btn-brand-blue-color py-1"
            clickFunction={() => dispatch(handleLogout())}
            buttonName={<span className='fs-5'>{Icons.logoutLocon}</span>}
          />


          {
            offcanvasOn ?
              <div className={`d-inline-block header-icon-tag-width ${offcanvasOn !== '' ? `d-${offcanvasOn}-none` : 'd-none'}`}>
                <ButtonComponent
                  type="button"
                  className="btn-brand-blue-color py-2"
                  clickFunction={offcanvasOnButton}
                  buttonName={Icons.menuIcon}
                />
              </div>
              :
              null
          }
        </div>
      </div>
    </>
  }

  return (

    <HeaderCard
      cardClassName='w-100 border-0 header-card '
      cardTitleClassName="row justify-content-end mb-0"
      cardBodyClassName='py-3 header-body'
      cardContent={headerContentFunc()}
    />

  )
}

export default Header