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

/** MySQL database username */
define( 'DB_USER', 'u1491134_devmw' );

/** MySQL database password */
define( 'DB_PASSWORD', 'adminweb2030' );

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
define( 'AUTH_KEY',         '-ja0H E,. fWhSCf#mk-Me$z[xp&?95.,RhI[k!-7kb/b19a) x=!s`KxoK1Y,{q' );
define( 'SECURE_AUTH_KEY',  '=Vo[,]Zlho}=84.@D5E91X`pJu!4U?/I@!*1`VXaYU$HQ8sI@<h $|a@0R`;nJQ2' );
define( 'LOGGED_IN_KEY',    'sN*T~9?ukj2d/$kmSOxBTKIn|]pc$+FSptn%:AGpZUYb8,87B~=fRaTxHJsrhEA8' );
define( 'NONCE_KEY',        'F?v.t:TLw>`3 #d+]nOA 4|U;zJA!RhvaFcWH{JZ0J+_:h5SwjR/c<RTp4Lf+Uj4' );
define( 'AUTH_SALT',        'EFw^X?X!F;4zC2dQRum4%xbEf{&1;g&rSyU.1MhK}&L<+lvh12!1;sZ0;6Q`iJ/o' );
define( 'SECURE_AUTH_SALT', 'yT9Kl4!t;MfJrjA,CV;7V{)i!}pRQTDR5leifvAtex1E^ 5o>!Vw_>B><I<Wgw{_' );
define( 'LOGGED_IN_SALT',   'WG831BDsC>mrVnWK%`%6~|+7W/Wcq~NT9)CzJ#se0B`l=hO[6lg&h3]oZ>M+c@9n' );
define( 'NONCE_SALT',       '>Q d$dpU KzfFNaZmfj2jLv/G:7Dk+Q;U)W*:DCxV0<Gjbmbt<u9le:|Co?P4=O]' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

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
