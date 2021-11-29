<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'u1491134_devmw' );

define('FS_METHOD', 'direct');

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '_t4$r+z5M#L~<U9%97:pAHmoa&S&dV/Afzd~FSWJ[&!)G:z+,NwvEi6mzJ!E)vdq' );
define( 'SECURE_AUTH_KEY',  'nv[Y-t-W8&q+kt:yIX$3K9 W2W2ici9B72:A!r>I]$yu{:%^@zV3L,]8UPd)Y9Bl' );
define( 'LOGGED_IN_KEY',    'c/uDzjm !Czm1:ZO]*0Dn7k-J_eU&#XE&MZ*G2,#_qFpYhp;y V+lT`E-c7nv9fg' );
define( 'NONCE_KEY',        '.lNa$`O+IyOBnVdLyXg@[MY_FQF<o)5.[g(`b!Y]*[v^$:W_ZZEX=$k&38^&>5Gm' );
define( 'AUTH_SALT',        'iSGu}Y)u+!z;T?eD>s,7ST? A`X9=ET+|]Y*SeG)2o?qhO+QxfOZn9tlQ1=8_&Sw' );
define( 'SECURE_AUTH_SALT', '~7A&,d|~RZ5A]3vC*aOZh=Pp(u6i@T6&<:$(8d@-BOQTTiT!nlSQb&t)Z2Vy$[*a' );
define( 'LOGGED_IN_SALT',   '[3A:~&Y;T<uu~Rc!iPAGze=w+jCgHnl))Mn`A@OeN$au&r0I67mw}?!QvOf,s3>Q' );
define( 'NONCE_SALT',       '#P, u0}o$ctuz{V|V,c;>_zf:A1ocSGSZZf6Fq:z;tqaPOHc?:S=XWS4/`4Hp_kZ' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'sma_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

@ini_set( 'upload_max_filesize' , '400M' );
@ini_set( 'post_max_size', '400M');
@ini_set( 'memory_limit', '800M' );
@ini_set( 'max_execution_time', '300' );
@ini_set( 'max_input_time', '300' );