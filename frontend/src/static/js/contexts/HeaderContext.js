import React from 'react';

import { config as mediacmsConfig } from '../mediacms/config.js';

const config =  mediacmsConfig( window.MediaCMS );

const links = config.url;
const theme = config.theme;
const user = config.member;

const hasThemeSwitcher = theme.switch.enabled && 'header' === theme.switch.position;

function popupTopNavItems(){

	const items = [];

	if( ! user.is.anonymous ){

		if( user.can.addMedia ){
			
			items.push({
				link: links.user.addMedia,
				icon: 'video_call',
				text: "Upload media",
				itemAttr:{
					className: 'visible-only-in-small'
				}
			});

			if( user.pages.home ){

				items.push({
					link: user.pages.home,
					icon: 'video_library',
					text: "My media",
				});
			}
		}

		items.push({
			link: links.signout,
			icon: 'exit_to_app',
			text: "Sign out",
		});
	}

	return items;
}

function popupMiddleNavItems(){

	const items = [];
	
	if( hasThemeSwitcher ){

		items.push({
			itemType: 'open-subpage',
			icon: 'brightness_4',
			iconPos: 'left',
			text: "Switch theme",
			buttonAttr: {
				className: 'change-page',
				'data-page-id': 'switch-theme'
			}
		});
	}

	if( user.is.anonymous ){

		if( user.can.login ){
			
			items.push({
				itemType: 'link',
				icon: 'login',
				iconPos: 'left',
				text: "Sign in",
				link: links.signin,
				linkAttr: {
					className: hasThemeSwitcher ? 'visible-only-in-small' : 'visible-only-in-extra-small',
				}
			});
		}

		if( user.can.register ){

			items.push({
				itemType: 'link',
				icon: 'person_add',
				iconPos: 'left',
				text: "Register",
				link: links.register,
				linkAttr: {
					className: hasThemeSwitcher ? 'visible-only-in-small' : 'visible-only-in-extra-small',
				}
			});
		}
	}
	else{
		
		items.push({
			link: links.user.editProfile,
			icon: 'brush',
			text: "Edit profile",
		});

		if( user.can.changePassword ){

			items.push({
				link: links.changePassword,
				icon: 'lock',
				text: "Change password",
			});
		}
	}

	return items;
}

function popupBottomNavItems(){

	const items = [];

	if( user.is.admin ){

		items.push({
			link: links.admin,
			icon: 'admin_panel_settings',
			text: "MediaCMS administration",
		});
	}

	return items;
}

const HeaderContext = React.createContext({
	hasThemeSwitcher,
	popupNavItems:{
		top: popupTopNavItems(),
		middle: popupMiddleNavItems(),
		bottom: popupBottomNavItems(),
	},
});

// export const HeaderProvider = HeaderContext.Provider;
export const HeaderConsumer = HeaderContext.Consumer;

export default HeaderContext;