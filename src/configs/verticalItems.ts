import { useTranslation } from 'react-i18next'
import { ROUTE_CONFIG } from './route'

export type TVertical = {
  title:string
  path?:string
  icon:string
  childrens?:{
    some(arg0: (item: TVertical) => any): unknown
    title:string
    path?:string
    icon:string
  }[]
}

export const VerticalItems = () => {
  const { t } = useTranslation()

  return [
    {
      title: t('systems'),
      icon: 'eos-icons:file-system-outlined',
      childrens: [
        {
          title: t('users'),
          icon: 'iconoir:group',
          path: ROUTE_CONFIG.SYSTEM.USER
        },
        {
          title: t('roles'),
          icon: 'icon-park-outline:permissions',
          path: ROUTE_CONFIG.SYSTEM.ROLE
        }
      ]
    },
    {
      title: t('manage_product'),
      icon: 'icon-park-outline:ad-product',
      childrens: [
        {
          title: t('products_list'),
          icon: 'eos-icons:products-outlined',
          path: ROUTE_CONFIG.MANAGE_PRODUCT.PRODUCTS
        },
        {
          title: t('categories'),
          icon: 'mdi:category-outline',
          path: ROUTE_CONFIG.MANAGE_PRODUCT.TYPE_PRODUCTS
        },
        {
          title: t('orders_management'),
          icon: 'lets-icons:order-light',
          path: ROUTE_CONFIG.MANAGE_PRODUCT.ORDERS
        },
        {
          title: t('reviews'),
          icon: 'mdi:rate-review',
          path: ROUTE_CONFIG.MANAGE_PRODUCT.REVIEWS
        }
      ]
    },
    {
      title: t('settings'),
      icon: 'lets-icons:setting-line',
      childrens: [
        {
          title: t('city_settings'),
          icon: 'solar:city-outline',
          path: ROUTE_CONFIG.SETTINGS.CITY
        },
        {
          title: t('delivery_type'),
          icon: 'ic:outline-local-shipping',
          path: ROUTE_CONFIG.SETTINGS.DELIVERY_TYPE
        },
        {
          title: t('payment_type'),
          icon: 'hugeicons:payment-02',
          path: ROUTE_CONFIG.SETTINGS.PAYMENT_TYPE
        }
      ]
    }
  ]
}
