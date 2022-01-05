import { toggleAlwaysOnTop } from '../actions/window'
import { zoomIn, zoomOut } from '../../windows/utils'
import { isOsx } from '../../config'

export default function (keybindings) {
  const menu = {
    label: '&Window',
    role: 'window',
    submenu: [{
      label: 'Minimize',
      accelerator: keybindings.getAccelerator('window.minimize'),
      role: 'minimize'
    }, {
      id: 'alwaysOnTopMenuItem',
      label: 'Always on Top',
      type: 'checkbox',
      accelerator: keybindings.getAccelerator('window.toggle-always-on-top'),
      click (menuItem, browserWindow) {
        toggleAlwaysOnTop(browserWindow)
      }
    }, {
      type: 'separator'
    }, {
      label: 'Zoom In',
      accelerator: keybindings.getAccelerator('window.zoom-in'),
      click (menuItem, browserWindow) {
        zoomIn(browserWindow)
      }
    }, {
      label: 'Zoom Out',
      accelerator: keybindings.getAccelerator('window.zoom-out'),
      click (menuItem, browserWindow) {
        zoomOut(browserWindow)
      }
    }, {
      type: 'separator'
    }, {
      label: 'Show in Full Screen',
      accelerator: keybindings.getAccelerator('window.toggle-full-screen'),
      click (item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
        }
      }
    }]
  }

  if (isOsx) {
    menu.submenu.push({
      label: 'Bring All to Front',
      role: 'front'
    })
  }
  return menu
}
