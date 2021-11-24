<?php
namespace WpCafe\Core\Menu;

defined( 'ABSPATH' ) || exit;

/**
 * Menu handle class
 */
class Wpc_Menus {

    use \WpCafe\Traits\Wpc_Singleton;
    
    public $settings;
    private $pages;
    private $sub_pages;

    /**
     * Call all action
     */
    public function init() {

        // create cafe  menu
        $this->pages = array(
            array(
                "page_title"  => esc_html__( 'Settings', 'wpcafe' ),
                "menu_title"  => esc_html__( 'WPCafe', 'wpcafe' ),
                "capability"  => 'manage_options',
                "menu_slug"   => 'cafe_menu',
                "cb_function" => [$this, 'wpc_admin_settings'],
                "icon"        => '',
                'position'    => 9,
            )
        );

        // create cafe sub menu
        $this->sub_pages = array(
            array(
                "parent_slug" => 'cafe_menu',
                "page_title"  =>esc_html__( 'Add new bookings', 'wpcafe' ),
                "menu_title"  =>esc_html__( 'Reservations', 'wpcafe' ),
                "capability"  => 'manage_options',
                "menu_slug"   => 'edit.php?post_type=wpc_reservation',
                "cb_function" => false,
                'position'    => 1,
            ),
        );

        // register menu and sub menu pages
        new \WpCafe\Core\Base\Wpc_Menu_Build( $this->pages , esc_html__( 'Settings', 'wpcafe' ) , $this->sub_pages );

    }

    /**
     * Show bookings
     */
    public function wpc_admin_settings() {
        \WpCafe\Core\Settings\Wpc_Key_Options::instance()->wpc_key_options();
    }

    /**
     * WpCafe app settings page
     */
    public function wpc_app_banner() {

        include_once \Wpcafe::core_dir()."settings/part/app_banner.php";
    }

}
