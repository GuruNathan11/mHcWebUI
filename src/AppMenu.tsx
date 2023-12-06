import React from "react";
import classNames from "classnames";
import { MenuItem } from "primereact/components/menuitem/MenuItem";
import { createBrowserHistory } from "history";
import dashboard from '../src/assets/images/dashboard.svg';
import  userManage from '../src/assets/images/AddForm.svg';
import userEdit from '../src/assets/images/EditForm.svg';
import setting from '../src/assets/images/settings.svg';
import reports from '../src/assets/images/ViewForm.svg';
import home from '../src/assets/images/home.svg';
import dollar from '../src/assets/images/dollar.svg';
import cases from '../src/assets/images/cases.svg';
import q15checkicon from '../src/assets/images/q15checkicon.png'
// import "./appmenu.scss";
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

    //alert(item.label);
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
          <li className={styleClass} key={i}>
            {item.items && this.props.root === true && (
              <div className="arrow"></div>
            )}
            <a style={{padding:'8px'}}
              href={item.url} title={item.label}
              className="menu_field"
              onClick={e => this.onMenuItemClick(e, item, i)}
              target={item.target}
            >
               {item.icon == 'dashboard' && (
              <img style={{height:'20px',float:'left'}} alt={item.icon} src={dashboard} /> )} 
              {item.icon == 'q15checkicon' && (
              <img style={{height:'20px',float:'left'}} alt={item.icon} src={q15checkicon} /> )}      
                  {item.icon == 'userEdit' && (
              <img style={{height:'20px',float:'left'}} alt={item.icon} src={userEdit} />) } 
               {item.icon == 'userManage' && (
              <img style={{height:'20px',float:'left'}} alt={item.icon} src={userManage} />) }
               {item.icon == 'reports' && (
              <img style={{height:'20px',float:'left'}} alt={item.icon} src={reports} /> )} 
                {item.icon == 'setting' && (
              <img style={{height:'20px',float:'left'}} alt={item.icon} src={setting} /> )} 
               {item.icon == 'dollar' && (
              <img style={{height:'20px',float:'left'}} alt={item.icon} src={dollar} /> )} 
              {item.icon == 'home' && (
              <img style={{height:'33px',paddingBottom:'6px',paddingLeft:'4px'}} alt={item.icon} src={home} /> )} 

{item.icon == 'cases' && (
              <img style={{height:'26px',float:'left',paddingLeft:'13px',marginBottom:'3px'}} alt={item.icon} src={cases} /> )}
             

              {( (item.icon !== 'userManage')  && (item.icon !== 'setting') && (item.icon !== 'home')  && (item.icon !== 'cases') && (item.icon !== 'reports') && (item.icon !== 'userEdit') && (item.icon !== 'dashboard')  &&  (item.icon !== 'dollar') ) &&  (  <i className={item.icon}></i> )}
              <span style={{fontSize:'10px',float:'left',marginLeft:'12px'}}>{item.label}  </span>
              {submenuIcon}
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

export class AppMenu extends React.Component<AppMenuProps, AppMenuState> {
  render() {
    return (
      <div className="menu" style={{ fontSize: "2.4em"}}>
        <AppSubmenu
          items={this.props.model}
          className="layout-main-menu"
          onMenuItemClick={this.props.onMenuItemClick}
          root={true}
        />
      </div>
    );
  }
}
