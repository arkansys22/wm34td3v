<?php

use \WpCafe\Utils\Wpc_Utilities;
use \WpCafe\Core\Shortcodes\Template_Functions as Wpc_Widget_Template;

$col = ($show_thumbnail == 'yes') ? 'wpc-col-md-8' : 'wpc-col-md-12';
$class = ($title_link_show=='yes')? '' : 'wpc-no-link';

$column_desktop     = $settings['wpc_menu_col'];
$column_tablet      = isset($settings['wpc_menu_col_tablet']) ? $settings['wpc_menu_col_tablet'] : 2;
$column_mobile      = isset($settings['wpc_menu_col_mobile']) ? $settings['wpc_menu_col_mobile'] : 1;
?>
<div class="wpc-food-menu-item style3">
    <div class="wpc-row">

<?php
foreach ($products as $product) {
    $permalink = ( $title_link_show == 'yes' ) ?  get_permalink($product->get_id()) : '#';
    $food_menu_list_args = array(
        'show_thumbnail'    => $show_thumbnail,
        'wpc_price_show'    => $wpc_price_show,
        'permalink'         => $permalink,
        'wpc_cart_button'   => $wpc_cart_button,
        'unique_id'         => $unique_id,
        'product'           => $product,
        'class'             => $class,
        'show_item_status'  => $show_item_status,
        'wpc_show_desc'     => $wpc_show_desc,
        'wpc_desc_limit'    => $wpc_desc_limit,
        'column_desktop'    => $column_desktop,
        'column_tablet'     => $column_tablet,
        'column_mobile'     => $column_mobile,
    );
    Wpc_Widget_Template::wpc_food_menu_list_template_three( $food_menu_list_args );

}
?>
    </div>
</div>
