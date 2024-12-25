import { ROUTE_CONFIG } from './route'

export const VerticalItems = [
  {
    title: 'Hệ thống',
    icon: 'eos-icons:file-system-outlined',
    childrens: [
      {
        title: 'Người dùng',
        icon: 'iconoir:group',
        path: ROUTE_CONFIG.SYSTEM.USER
      },
      {
        title: 'Nhóm vai trò',
        icon: 'icon-park-outline:permissions',
        path: ROUTE_CONFIG.SYSTEM.ROLE
      }
    ]
  },
  {
    title: 'Quản trị sản phẩm',
    icon: 'icon-park-outline:ad-product',
    childrens: [
      {
        title: 'Danh sách sản phẩm',
        icon: 'eos-icons:products-outlined',
        path: ROUTE_CONFIG.MANAGE_PRODUCT.PRODUCTS
      },
      {
        title: 'Danh mục sản phẩm',
        icon: 'mdi:category-outline',
        path: ROUTE_CONFIG.MANAGE_PRODUCT.TYPE_PRODUCTS
      },
      {
        title: 'Danh sách đơn hàng',
        icon: 'lets-icons:order-light',
        path: ROUTE_CONFIG.MANAGE_PRODUCT.ORDERS
      },
      {
        title: 'Danh sách đánh giá',
        icon: 'mdi:rate-review',
        path: ROUTE_CONFIG.MANAGE_PRODUCT.REVIEWS
      }
    ]
  },
  {
    title: 'Cài đặt',
    icon: 'lets-icons:setting-line',
    childrens: [
      {
        title: 'Cài đặt thành phố',
        icon: 'solar:city-outline',
        path: ROUTE_CONFIG.SETTINGS.CITY
      },
      {
        title: 'Phương thức giao hàng',
        icon: 'ic:outline-local-shipping',
        path: ROUTE_CONFIG.SETTINGS.DELIVERY_TYPE
      },
      {
        title: 'Phương thức thanh toán',
        icon: 'hugeicons:payment-02',
        path: ROUTE_CONFIG.SETTINGS.PAYMENT_TYPE
      }
    ]
  }
]
