import React from "react";
import classNames from "classnames";
import { MenuItem } from "primereact/components/menuitem/MenuItem";
import { createBrowserHistory } from "history";
import dashboard from '../src/assets/images/mettler_images/RiDashboardLine.svg';
import  userManage from '../src/assets/images/AddForm.svg';
import userEdit from '../src/assets/images/mettler_images/usersImage_dark.svg';
import setting from '../src/assets/images/mettler_images/settingImage_dark.svg';
import reports from '../src/assets/images/ViewForm.svg';
import home from '../src/assets/images/home.svg';
import dollar from '../src/assets/images/dollar.svg';
import cases from '../src/assets/images/cases.svg';
import q15checkicon from '../src/assets/images/q15checkicon.png'
import plusImage from '../src/assets/images/mettler_images/plusImage.png'
import fileDocument from '../src/assets/images/mettler_images/file-document_dark.svg';
import pocket from './assets/images/mettler_images/pocket.svg';
import rectangular from './assets/images/mettler_images/Rectangle_light.svg';

interface AppSubmenuProps {
  className?: string;
  items: Array<MenuItem>;
  onMenuItemClick(e: { originalEvent: Event; item: MenuItem }): void;
  root?: boolean;
}

interface AppSubmenuState {
  activeIndex: React.Key | null;
}

class AppSubmenu extends React.Component<AppSubmenuProps, AppSubmenuState> {
  constructor(props: AppSubmenuProps) {
    super(props);
    this.state = {
      activeIndex: null
    };
  }
  
  history = createBrowserHistory();

  onMenuItemClick(event: any, item: MenuItem, index: React.Key) {

    const loggedInString = localStorage.getItem("AUTHDATA");
   if(loggedInString.length>0){
    //avoid processing disabled items
    if (item.disabled) {
      event.preventDefault();
      return true;
    }

    //execute command
    if (item.command) {
      item.command({ originalEvent: event, item: item });
    }

    //prevent hash change
    if (item.items || !item.url) {
      event.preventDefault();
    }

    if (index === this.state.activeIndex) this.setState({ activeIndex: null });
    else this.setState({ activeIndex: index });

    if (this.props.onMenuItemClick) {
      this.props.onMenuItemClick({
        originalEvent: event,
        item: item
      });
    }
  }else{
 
    if(window.location.pathname!=='/Login'  && window.location.pathname!=='passwordchange' && window.location.pathname!=='forgotPasswordUpdate'   ){
      window.location.href = "/Login";
    }
  }
 
  }

  render() {
    let items =
      this.props.items &&
      this.props.items.map((item, i) => {
        let active = this.state.activeIndex === i;
        let styleClass = classNames({ "active-menuitem": active });
        //            let styleClass = classNames(item.badgeStyleClass, {'active-menuitem': active})
        //            let badge = item.badge && <span className="menuitem-badge">{item.badge}</span>
        let submenuIcon = item.items && (
          <i className="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>
        );

        return (
          <li className={styleClass} key={i} >
            {item.items && this.props.root === true && (
              <div className="arrow"></div>
            )}
            <a style={{padding:'12px'}}
              href={item.url} title={item.label}
              onClick={e => this.onMenuItemClick(e, item, i)}
              target={item.target}
            >
              {item.icon == 'dashboard' && (
              <img style={{height:'80%'}} alt={item.icon} src={dashboard} /> )} 
               {item.icon == 'q15checkicon' && (
              <img style={{height:'44px',marginLeft:'-4px'}} alt={item.icon} src={q15checkicon} /> )} 
                  {item.icon == 'userEdit' && (
              <img style={{height:'38px',marginLeft:'5px'}} alt={item.icon} src={userEdit} />) } 
               {item.icon == 'userManage' && (
              <img style={{height:'50px',marginLeft:'5px'}} alt={item.icon} src={userManage} />) }
               {item.icon == 'reports' && (
              <img style={{height:'50px'}} alt={item.icon} src={reports} /> )} 
                {item.icon == 'setting' && (
              <img style={{height:'80%'}} alt={item.icon} src={setting} /> )} 
               {item.icon == 'home' && (
              <img style={{height:'33px',paddingBottom:'6px',paddingLeft:'4px'}} alt={item.icon} src={home} /> )} 
             {item.icon == 'dollar' && (
              <img style={{height:'37px',marginTop:'-7px',marginBottom:'7px'}} alt={item.icon} src={dollar} /> )}
            {item.icon == 'cases' && (
              <img style={{height:'26px',float:'left',paddingLeft:'13px',marginBottom:'3px'}} alt={item.icon} src={cases} /> )}
      
            
              {( (item.icon !== 'userManage') && (item.icon !== 'cases')  && (item.icon !== 'home') && (item.icon !== 'setting') && (item.icon !== 'reports')  && (item.icon !== 'userEdit') && (item.icon !== 'dashboard') &&  (item.icon !== 'dollar') ) &&  (  <i className={item.icon}></i> )}
             {/* <i className={item.icon}></i>
               {submenuIcon}   */}
            </a>
            <AppSubmenu
              items={item.items as Array<MenuItem>}
              onMenuItemClick={this.props.onMenuItemClick}
            />
          </li>
        );
      });

    return items ? <ul className={this.props.className}>{items}</ul> : null;
  }
}

interface AppMenuProps {
  model: Array<MenuItem>;
  className?: string;
  onMenuItemClick(e: { originalEvent: Event; item: MenuItem }): void;
}

interface AppMenuState {}

export class AppnewMenu extends React.Component<AppMenuProps, AppMenuState> {
  usersEdit(){
    window.location.href = "/MettlerPatientLoginDashboard";
  }

  adminPage(){
    window.location.href = "/MettlerAdminDashboard";
  }
  render() {
    return (
      <div style={{display:'inline-flex',flexDirection:'column',alignItems:'center',gap:'25px',marginTop:'-22px'}} className="menu">
      {/*   
        <AppSubmenu
          items={this.props.model}
          className="layout-main-menu"
          onMenuItemClick={this.props.onMenuItemClick}
          root={true}
        />
    */}
        <img style={{height:'60px',width:'59px'}} src={rectangular}></img>     
        <img style={{height:'36px',width:"38px",marginTop:'1px',marginBottom:'7px'}} alt="" src={plusImage} />
        <img style={{height:'20px',width:"20px"}} alt="" src={dashboard} />
        <a style={{cursor:'pointer'}} onClick={this.usersEdit}><img style={{height:'20px',width:"20px"}} alt="" src={userEdit} /></a>
        <img style={{height:'20px',width:"20px"}} alt="" src={fileDocument} />
        <a style={{cursor:'pointer'}} onClick={this.adminPage}><img style={{height:'20px',width:"20px"}} alt="" src={setting} /></a>
      </div>
    );
  }
}
