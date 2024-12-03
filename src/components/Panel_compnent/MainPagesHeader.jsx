import React from 'react'

import { useDispatch } from '../CustomHooks';
import Img from '../Img/Img'
import ButtonComponent from '../Button/Button';
import Image from '../../Utils/Image'
import Icons from '../../Utils/Icons';
import { handleLogout } from '../../Redux/Actions/Common_actions/Common_action';
import HeaderCard from '../Card/HeaderCard';
import { useSelector } from 'react-redux';

const MainPagesHeader = ({
  offcanvasOn,
  offcanvasOnButton,
  componentFrom
}) => {
  const { currentMenuName } = useSelector((state) => state.commonState);
  const dispatch = useDispatch();


  const headerContentFunc = () => {
    return <div className="col-12 d-flex flex-wrap align-items-center justify-content-between">
      <div className="col d-none d-md-inline-block">
        {currentMenuName}
      </div>
      
      <div className="col-12 col-md-6 d-inline-flex flex-wrap justify-content-end ">
        <ButtonComponent
          type="button"
          className="px-3 ms-2 btn-primary py-1"
          clickFunction={() => dispatch(handleLogout())}
          buttonName={<span className='fs-5'>{Icons.logoutLocon}</span>}
        />


        {
          offcanvasOn ?
            <div className={`d-inline-block header-icon-tag-width ${offcanvasOn !== '' ? `d-${offcanvasOn}-none` : 'd-none'}`}>
              <ButtonComponent
                type="button"
                className="btn-primary py-2"
                clickFunction={offcanvasOnButton}
                buttonName={Icons.menuIcon}
              />
            </div>
            :
            null
        }
      </div>
    </div>
  }

  return (
    // <header>
    //   <div className="container-fluid h-100 p-0">
    //     <div className='d-flex flex-wrap align-items-center h-100 px-2 px-sm-4 px-md-5'>
    //       <div className="col">
    //         <Img
    //           src={Image.companyLogoBlue}
    //           className="cursor-pointer"
    //           width="198px"
    //           height="33px"
    //         />
    //       </div>
    //       <div className="col d-inline-flex justify-content-end">
    //         <ButtonComponent
    //           type="button"
    //           className="px-3 me-xl-2"
    //           clickFunction={() => dispatch(handleLogout())}
    //           buttonName={
    //             <span>
    //               {Icons.logoutLocon}
    //               <span className='ms-2 d-none d-sm-inline-block'>Logout</span>
    //             </span>
    //             }
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </header>


    <HeaderCard
      cardClassName='w-100 border-0 header-card '
      cardTitleClassName="row justify-content-end mb-0"
      cardBodyClassName='py-3 header-body'
      cardContent={headerContentFunc()}
    />


  )
}

export default MainPagesHeader