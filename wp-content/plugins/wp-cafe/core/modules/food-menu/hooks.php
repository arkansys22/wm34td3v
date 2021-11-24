<?php

namespace WpCafe\Core\Modules\Food_Menu;

defined( 'ABSPATH' ) || exit;

class Hooks {

    use \WpCafe\Traits\Wpc_Singleton;

    /**
     * Fire all hooks
     */
    public function init(){
        add_action( 'woocommerce_thankyou', [$this,'wpc_checkout_callback'], 10, 1 );
    }

    /**
     * after successful checkout, some data are returned from woocommerce
     * we can use these data to update our own data storage / tables
     */
    public function wpc_checkout_callback( $order_id ) {
        if ( !$order_id ) {
            return;
        }
        global $wpdb;
        $order = wc_get_order( $order_id );
        
        do_action("wpcafe/after_thankyou");

    }

}
