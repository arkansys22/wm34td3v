(function($) {

    "use strict";

    var selected_values = [];

    $(document).ready(function() {

        var time_class = ['.wpc_weekly_schedule_start_time','.wpc_weekly_schedule_end_time','.wpc_exception_start_time',
        '.wpc_exception_end_time'];

        // load  time picker  
        $.map(time_class,function(value,index){
            $('.schedule_main_block,.multi_schedule_block, .exception_main_block').on('focus', value , function(){      
                var clicked_start         = true;

                var current_id            = $(this).attr('id');
                var related_picker_class  = '';

                if ( value == ".wpc_weekly_schedule_start_time" || value == ".wpc_exception_start_time" ) {
                    related_picker_class = time_class[index+1] + '_' + current_id;
                } else {
                    clicked_start        = false;
                    related_picker_class = time_class[index-1] + '_' + current_id;
                }

                initialize_any_time_picker($, this, clicked_start, related_picker_class);

                if ( index == 0 || index == 1 ) {
                    time_picker( $, $(this), "weekly", clicked_start, related_picker_class, '.wpc_weekly_clear' )
                }
                else if ( index == 2 || index == 3 ) {
                    time_picker( $, $(this), "exceptional", clicked_start, related_picker_class )
                }
            });
        });

        // checkbox show hide

        var checkbox_arr = ['#wpc_allow_cancellation','#wpc_admin_notification_for_booking_req',
            '#wpc_user_notification_for_booking_req','#wpcafe_allow_cart',
            '#wpc_user_notification_for_confirm_req','#wpc_admin_notification_for_confirm_req',
            '#wpc_user_notification_for_cancel_req','#wpc_admin_cancel_notification'];

        checkbox_default_show_hide( $, checkbox_arr )



        /**********************
         Add remove block
         **********************/

        // Exceptional schedule dynamically increase decrease
        var exception_obj = {wrapper_block: '.exception_block' , parent_block:'.exception_section',second_wrapper:'exception_block',
                append_wrapper:'.exception_main_block',button_wrapper:'.add_exception_block',date_name:'wpc_exception_date', exception_message:'schedule_exception_message',
                start_class_wrap: 'wpc_exception_start_wrap', end_class_wrap: 'wpc_exception_end_wrap',
                start_time_name:'wpc_exception_start_time',end_time_name:'wpc_exception_end_time',remove_button:'remove_exception_block'};

        add_exception_block( exception_obj , 'reservation_exception_schedule' );

        // Weekly schedule dynamically increase decrease
        var add_weekly_schedule_block_params = {
            parent_block        : 'schedule_block',
            second_wrapper      : 'wpc-weekly-schedule-list',
            second_wrapper_extra: 'week_schedule_wrap',
            append_wrapper      : '.schedule_main_block',
            button_wrapper      : '.wpc-weekly-schedule-btn',
            button_class        : '.add_schedule_block',
            field_name          : 'wpc_weekly_schedule',
            start_time_name     : 'wpc_weekly_schedule_start_time',
            end_time_name       : 'wpc_weekly_schedule_end_time',
            remove_button       : 'remove_schedule_block',
            clear_button        : 'wpc_weekly_clear',
            validation_message  : 'weekly_message',
            block_type          : 'weekly',
            start_class         : 'wpc_weekly_schedule_start_time',
            end_class           : 'wpc_weekly_schedule_end_time',
            start_class_wrap    : 'wpc_weekly_start_wrap',
            end_class_wrap      : 'wpc_weekly_end_wrap',
        };

        add_week_block( add_weekly_schedule_block_params );
        
        // remove schedule block
        var remove_weekly_block = { parent_block:'.schedule_main_block', remove_button:'.remove_schedule_block'
            , removing_block:'.schedule_block' , type:'weekly' ,  };

        remove_weekly_schedule_block( remove_weekly_block );
        
        function remove_weekly_schedule_block( obj  ) {
            $(obj.parent_block).on( 'click' , obj.remove_button , function(e) {
                e.preventDefault(); 
                
                $(this).parent( obj.removing_block ).remove();

                switch ( obj.type ) {
                    case "weekly":
                        selected_values = [];
                        
                        $('.week_schedule_wrap :checkbox').each(function(){
                            if($(this).is(":checked")){
                                var value = $(this).attr('class');
                                selected_values.push(value);
                            }
                        });

                        // re-order data id
                        $('.schedule_main_block .week_schedule_wrap').each( (index , value )=>{
                            var get_id = $(value).attr('data-id')
                            $(value)
                            .removeClass('week_schedule_wrap_'+get_id)
                            .addClass('week_schedule_wrap_'+index)
                            .attr('data-id',index);
                            
                        });

                        break;
                
                    default:
                        break;
                }

            });
        }

        // remove exception schedule block
        var remove_exception_block = { parent_block:'.exception_main_block', remove_button:'.remove_exception_block'
            , removing_block:'.exception_block' };

        remove_block( remove_exception_block );

        // clear action
        var clear_class = ['.wpc_weekly_clear','.wpc_all_day_clear','.exception_time_clear', '.wpc_multi_weekly_clear', '.wpc_reservation_holiday_clear'];

        $.each(clear_class,function(ind,val){
            $('.wpc-all-day-schedule,.schedule_main_block,.multi_schedule_block,.exception_main_block, .holiday_exception_block').on('click', val ,function(){
                var $this = $(this);
                var type  = 'reset_time';

                if ( ind === 0 ) {
                    $('.wpc_weekly_schedule_start_time_'+$this.attr("id") ).val('').timepicker('remove');
                    $('.wpc_weekly_schedule_end_time_'+$this.attr("id") ).val('').timepicker('remove');
                    $('.weekly_message_'+$this.attr("id") ).html('');

                    var field_blocks           = [ $('.wpc_weekly_schedule_start_time_'+$this.attr("id") ), ];
                    var field_dependent_blocks = [ $('.wpc_weekly_schedule_end_time_'+$this.attr("id") ), ];

                    add_field_validation_error_content($, type, field_blocks, false);
                    add_field_validation_error_content($, type, field_dependent_blocks, true);

                    hide_reset_button($this);
                }
                else if( ind === 1 ) {
                    $('input[name="wpc_all_day_start_time"]').val('').timepicker('remove');
                    $('input[name="wpc_all_day_end_time"]').val('').timepicker('remove').prop('disabled', true);
                    $('.all_day_message').html('');

                    remove_field_validation_error_content($this.siblings('.wpc_all_day_end'));

                    hide_reset_button($this);
                }
                else if( ind === 2 ) {
                    $('.wpc_exception_date_'+$this.attr("id") ).val('');
                    $('.wpc_exception_start_time_'+$this.attr("id") ).val('').timepicker('remove');
                    $('.wpc_exception_end_time_'+$this.attr("id") ).val('').timepicker('remove');
                    $('.schedule_exception_message_'+$this.attr("id")).html('');

                    disable_all_fields($this.parent().find(".wpc_exception_start_time, .wpc_exception_end_time"));

                    hide_reset_button($this);
                }
                else if( ind === 3 ) {
                    $('.multi_diff_start_time_'+$this.attr("id") ).val('').timepicker('remove');
                    $('.multi_diff_end_time_'+$this.attr("id") ).val('').timepicker('remove');
                    $('.diff_schedule_name_'+$this.attr("id") ).val('');
                    $('.diff_seat_capacity_'+$this.attr("id") ).val('');
                    $('.weekly_multi_message_'+$this.attr("id")).html('');

                }
                else if( ind === 4 ) {
                    $('.wpc_reservation_holiday_'+$this.attr("id") ).val('');
                    hide_reset_button($this);
                }
            })
        });

        // Add weekly block
        $('.week_schedule_wrap :checkbox').each(function(){
            if($(this).is(":checked")){
                selected_values.push($(this).attr('class'))
            }
        });

        $('.schedule_main_block').on( 'change' , '.week_schedule_wrap :checkbox' , function(){
            var $this             = $(this);
            var wpc_all_day_start = $(".wpc_all_day_start").val();
            var wpc_all_day_end   = $(".wpc_all_day_end").val();
            if( wpc_all_day_start == "" && wpc_all_day_end == "" ){

                var value   = $this.attr('class');
                var get_id  = $this.parents(".week_schedule_wrap").data('id');
                
                var parent_block = $this.parents(".week_schedule_wrap");

                if( $this.is(":checked") ){
                    var check = $.inArray(value , selected_values );
                    // if not exist , push in array
                    if( check == -1 ){
                        selected_values.push(value);
                        var get_message = $this.parents(".week_schedule_wrap").children(".wpc-default-guest-message");
                        if (get_message.length > 0 ) {
                            get_message.html("")
                        }

                        var field_blocks           = [ parent_block.find(".wpc_weekly_schedule_start_time"), ]
                        var field_dependent_blocks = [ parent_block.find(".wpc_weekly_schedule_end_time"), ]

                        var type = 'day_date_checked';
                        add_field_validation_error_content($, type, field_blocks, true);
                        add_field_validation_error_content($, type, field_dependent_blocks, false);                        
                    }else{
                        $this.prop("checked", false);
                        alert( value.toUpperCase() + " " +"day exist. Please check another day");
                    }
                }
                else{
                    
                    var checked_values = [];
                    $('.schedule_main_block .week_schedule_wrap_'+get_id+' :checkbox').each(function(){
                        if($(this).is(":checked")){
                            var value = $(this).attr('class');
                            checked_values.push(value);
                        }
                    });

                    if ( checked_values.length == 0 ) {
                        $( ".wpc_weekly_schedule_start_time_" + get_id ).val("").timepicker('remove');
                        $( ".wpc_weekly_schedule_end_time_" + get_id ).val("").timepicker('remove');

                        // remove error msg for this block
                        var get_message = parent_block.children(".wpc-default-guest-message");
                        if (get_message.length > 0 ) {
                            get_message.html("")
                        }
               
                        var disable_fields = parent_block.find(".wpc_weekly_schedule_start_time, .wpc_weekly_schedule_end_time");
                        disable_all_fields(disable_fields);

                        hide_reset_button(parent_block.find(".wpc_weekly_clear"));
                    }

                    selected_values.splice(selected_values.indexOf(value),1);
                }
                if (selected_values.length == 0) {
                    $('input.wpc_all_day_start').removeAttr("disabled");
                }
            }
            else
            {
                var schedule_block = $(".week_schedule_wrap :checkbox");
                $(schedule_block). prop("checked", false);
                alert( "You have already set all day schedule . Please unset all day schedule .");
            }
        });
     
        // all day schedule
        $(".wpc-all-day-schedule").on('focus',".wpc_all_day_start , .wpc_all_day_end", function(){
            if( selected_values.length == 0 ){

                var clicked_start        = false;
                var related_picker_class = '.wpc_all_day_start';

                if ($(this).attr('name') == "wpc_all_day_start_time" ) {
                    clicked_start        = true;
                    related_picker_class = '.wpc_all_day_end';
                }

                initialize_any_time_picker($, this, clicked_start, related_picker_class, );
                time_picker( $, $(this) , 'all_day', clicked_start, related_picker_class, '.wpc_all_day_clear' );

            }else{
                $('input.wpc_all_day_start,input.wpc_all_day_end').val();
                $('input.wpc_all_day_start,input.wpc_all_day_end').prop( 'disabled', 'disabled' );
                alert( "You have already checked weekly schedule . Please uncheck weekly schedule .");
            }
        });


        /****************************
         Guest reservation form
         *****************************/


        //====================== Reservation form actions start ================================= //
        var obj = {}; var wpc_booking_form_data ={};
        if (typeof wpc_form_data !== "undefined") {
            if ( $.isArray( wpc_form_data ) && wpc_form_data.length === 0 ) {
                wpc_booking_form_data = null;
            }else{
                wpc_booking_form_data = wpc_form_data[0];
            }
            obj.wpc_form_client_data = wpc_booking_form_data;
            var $wpc_booking_section = $('.wpcafe-meta');
            var wpc_booking_date = $wpc_booking_section.find("#wpc_booking_date");
            if ( wpc_booking_date.length > 0) {
                obj.wpc_booking_date = wpc_booking_date;
                obj.booking_form_type= "admin";
                obj.inline_value     = false;
                obj.reserve_status   = null;

                reservation_form_actions( $ , obj )
            }
        }
        //====================== Reservation form actions end ================================= //



        //admin settings tab
        $('.wpc-settings').on('click',".wpc-tab li a",function(e){
            e.preventDefault();
            var data_id = $(this).attr('data-id');
            $(".wpc-tab li a").removeClass("nav-tab-active");
            $(this).addClass("nav-tab-active");
            $(".tab-content .tab-pane").removeClass("active");
            $(".tab-pane[data-id='tab_" + data_id + "']").addClass("active");

            // set current tab
            $(".settings_tab").val("").val(data_id);

            // Hide submit button for Hooks tab
            var settings_submit = $("#cafe_settings_submit");
            if ( data_id =="hooks" ) {
                settings_submit.addClass("hide_field");
            }
            else{
                settings_submit.removeClass("hide_field");
            }

        });

            //custom tabs
        $( '.wpc-tab-wrapper' ).on('click', '.wpc-tab-a', function (event) {
            event.preventDefault();
            var tab_wrpaper = $(this).closest(".wpc-tab-wrapper");
            tab_wrpaper.find(".wpc-tab").removeClass('wpc-active');
            tab_wrpaper.find(".wpc-tab[data-id='" + $(this).attr('data-id') + "']").addClass("wpc-active");
            tab_wrpaper.find(".wpc-tab-a").removeClass('wpc-active');
            $(this).parent().find(".wpc-tab-a").addClass('wpc-active');
        });



        // Default party size validation

        var select_class = ['#wpc_default_gest_no','#wpc_min_guest_no','#wpc_max_guest_no'];

        var default_error = $('.default_error'); var min_error = $('.min_error'); var max_error = $('.max_error');

        $.each( select_class , function(index,value){
            $( value ).on('change',function(element){

                var default_guest_val = $('#wpc_default_gest_no :selected').val();
                var wpc_min_guest_no = $('#wpc_min_guest_no :selected').val();
                var wpc_max_guest_no = $('#wpc_max_guest_no :selected').val();

                // default
                if (  parseInt(default_guest_val) == 0 || 
                ( parseInt(default_guest_val) >= parseInt(wpc_min_guest_no)  &&  parseInt(wpc_max_guest_no) > parseInt(default_guest_val) ) ) {
                    default_error.fadeOut()
                    default_error.addClass('hide_field')
                    $('#wpc_default_gest_no :selected').prop('selected',true)
                } else {
                    default_error.fadeIn()
                    default_error.removeClass('hide_field')
                    $('#wpc_default_gest_no :selected').prop('selected',false)
                }

                if(wpc_min_guest_no !=="" && wpc_max_guest_no !==""){
                    // minimum
                    if ( parseInt(wpc_min_guest_no) < parseInt(wpc_max_guest_no) ) {
                        min_error.fadeOut()
                        min_error.addClass('hide_field')
                        $('#wpc_min_guest_no :selected').prop('selected',true)
                    } else {
                        min_error.fadeIn()
                        min_error.removeClass('hide_field')
                        $('#wpc_min_guest_no :selected').prop('selected',false)
                    }

                    // maximum
                    if ( parseInt(wpc_max_guest_no) > parseInt(wpc_min_guest_no) ) {
                        max_error.fadeOut()
                        max_error.addClass('hide_field')
                        $('#wpc_max_guest_no :selected').prop('selected',true)
                    } else {
                        max_error.fadeIn()
                        max_error.removeClass('hide_field')
                        $('#wpc_max_guest_no :selected').prop('selected',false)
                    }
                }
            });
        });
    });
    
    // load color picker
    var color_array = ["#wpc_primary_color","#wpc_secondary_color","#app_bg_color"];
    $.each(color_array,function(index,value){
        $(value).wpColorPicker();
    });

    // **********************
    //  get from value in shortcode settings
    //  ****************************

     $('.shortcode-generator-wrap').on('click', '.shortcode-generate-btn', function (event) {
        event.preventDefault();
        var arr = [];

        $(this).parents('.shortcode-generator-wrap').find(".wpc-field-wrap").each(function(){
            var $this = $(this);
            var data = $this.find('.wpc-setting-input').val();
            var option_name = $this.find('.wpc-setting-input').attr('data-cat');
            var post_count = $this.find('.post_count').attr('data-count');

            if(option_name !=undefined && option_name !=''){
                data = option_name+' = '+ (data.length ? data : '""');
            }
            if(post_count !=undefined && post_count !=''){
                data = post_count+' = '+ (data.length ? data : '""');
            }
            arr.push(data);
        });


       var allData = arr.filter(Boolean);
       var shortcode = "["+ allData.join(' ') +"]";

      $(this).parents('.shortcode-generator-wrap').find('.wpc_include_shortcode').val(shortcode);
      $(this).parents('.shortcode-generator-wrap').find('.copy_shortcodes').slideDown();
      
    });

    $('.shortcode-generator-wrap').on('click', '.s-generate-btn', function (event) {
        var $this = $(this);
       $($this).parents('.shortcode-generator-wrap').find('.shortcode-generator-main-wrap').fadeIn();

       $($this).parents('.shortcode-generator-wrap').mouseup(function(e){
            var container = $(this).find(".shortcode-generator-inner");
            var container_parent = container.parent(".shortcode-generator-main-wrap");
            if(!container.is(e.target) && container.has(e.target).length === 0){
                container_parent.fadeOut();
            }
        });

    });
    $('.shortcode-generator-wrap').on('click', '.shortcode-popup-close', function (event) {
       $(this).closest('.shortcode-generator-main-wrap').fadeOut();
    });


    $(".wpc-field-wrap").each(function(){
        $(this).find(".get_schedule_template").on('change', function(){
            $(this).find("option:selected").each(function(){
                var $this = $(this);
                var optionValue = $this.attr("value");
                if(optionValue === 'schedules'){
                    $this.parents(".shortcode-generator-inner").find('.wpc-shortcode-select').attr("multiple", 'multiple');
                }else if(optionValue =='etn_pro_schedules_tab'){
                    $this.parents(".shortcode-generator-inner").find('.wpc-shortcode-select').attr("multiple", 'multiple');
                } else{
                    $this.parents(".shortcode-generator-inner").find('.wpc-shortcode-select').removeAttr("multiple");
                }
            });
        }).change();

    });

   show_conditional_field($,'select',"form_style ='2'", '.image-url-field');

    /*--------------------------------
    // Short code builder action
    -----------------------------------*/
    var list_style = $(".list-style"); var tab_style = $(".tab-style");
    $(".free-options").on('change',function() {
        if ($(this).val() == "wpc_food_menu_list") {
            list_style.removeClass("wpc-d-none")
            tab_style.addClass("wpc-d-none")
        } else {
            tab_style.removeClass("wpc-d-none")
            list_style.addClass("wpc-d-none")
        }
    })

    // **********************
        //  end
    //  ****************************

    //   load flat picker
    var input_list = [ '.wpc_exception_date','.wpc_pickup_exception_date', '.wpc_delivery_exception_date', '.wpc_reservation_holiday' ];
    $.each( input_list , function( index , value ){
        $(value).flatpickr();
    })

    $(document).on('change', '.wpc_exception_date', function(selectedDates, dateStr, instance){
        if ( dateStr != '' ) {
            var parent     = $(this).parent();
            var current_id = $(this).data('current_id');

            var field_blocks           = [ parent.find(".wpc_exception_start_time_" + current_id), ]
            var field_dependent_blocks = [ parent.find(".wpc_exception_end_time_" + current_id), ]

            var type = 'day_date_checked';
            add_field_validation_error_content($, type, field_blocks, true);
            add_field_validation_error_content($, type, field_dependent_blocks, false);
            
            show_reset_button(parent.find(".exception_time_clear"));
        }
    });

    // Early booking settings field 
    $('#wpc_early_bookings').on('change', function(e) {
        let early_bookings_type = e.target.value;

        if( early_bookings_type !== 'any_time' ){
            $('[name="wpc_early_bookings_value"]').prop('disabled', false).show();
        }else{
            $('[name="wpc_early_bookings_value"]').prop('disabled', true).val('').hide();
        }
    });

})(jQuery)

// show/hide conditional field in shortcode generate
function show_conditional_field($, selectClass, optionName, showHideClass){
    $(selectClass).on('change', function(){
        $(this).find("option:selected").each(function(){
            var optionValue = $(this).attr("value");
            if(optionValue !== optionName){
                $('.shortcode-generator-inner').find(showHideClass).show();
            } else{
                $('.shortcode-generator-inner').find(showHideClass).hide();
            }
        });
    });
}

// if get value 0 turn into time
function time_picker( $, data , type ="", clicked_start = true, related_picker_class = '', reset_button_class = '' ) {

    data.on('changeTime',function(){
        if ( "0" === data.val() ) {
            data.val('12:00 AM')
        }

        // time is set/changing, so remove error msg plus error highlighting class if exists
        remove_field_validation_error_content( data );

        // after clicking start, remove disabled attribute from end time
        if ( clicked_start ) {
            var end_has_disabled_attr = $(related_picker_class).attr('disabled');

            if (typeof end_has_disabled_attr !== 'undefined' && end_has_disabled_attr !== false) {
                $(related_picker_class).removeAttr('disabled');
            }
        }

        // show reset button, when there exists content in fields
        if( reset_button_class !== '' ) {
            var reset_button = $(related_picker_class).parent().siblings(reset_button_class);
            if( reset_button.length == 1 ) {
                show_reset_button(reset_button);
            }
        }

        // for all day there is no day/date selection, so need to apply condition when time is changed
        if( type =='all_day' && clicked_start ) {
            var field_dependent_blocks = [ $(document.querySelector(related_picker_class)), ];
            add_field_validation_error_content($, 'day_date_checked', field_dependent_blocks, false);
        }

        var current_time = data.timepicker('getTime');
        if( current_time !== '' && current_time !== null ){
            var endTime   = new Date(current_time.getTime() + 30*60*1000); // add 30 minutes: 60*1000 milliseconds
            var startTime = new Date(current_time.getTime() - 30*60*1000); // subtract 30 minutes

            if( related_picker_class != '' ) {
                if( clicked_start ) {
                    $(related_picker_class).timepicker( 'option', 'minTime', endTime );
                } else {
                    // $(related_picker_class).timepicker( 'option', 'maxTime', startTime );
                }
            }
        }

        switch (type) {
            case "all_day":
                schedule_time_validation( $ , type , data );
                break;
            case "multi_all_day":
                schedule_time_validation( $ , type , data );
                break;
            case "multi_diff_days":
                schedule_time_validation( $ , type , data );
                break;
            case "weekly":
                schedule_time_validation( $ , type , data );
                break;
            case "exceptional":
                schedule_time_validation( $ , type , data );
                break;
            case "pickup":
                schedule_time_validation( $ , type , data );
                break;
            case "delivery":
                schedule_time_validation( $ , type , data );
                break;
            default:
                break;
        }

        data.timepicker('hide');
    })
}

/**
 * Reservation schedule time validation
 */
function schedule_time_validation( $ , type = '' , input ){
    var start = ""; var end = ""; var response = ""; var message_class="";
    switch ( type ) {
        case 'all_day':
            start   = $(".wpc_all_day_start").val();
            end     = $(".wpc_all_day_end").val();
            message_class = $(".all_day_message");
            // all day schedule get message
            settings_time_validation( start, end , message_class , input );

            break;
        case 'multi_all_day':
            var id  = input.attr('id');
            start   = $(".multi_all_start_time_"+id).val();
            end     = $(".multi_all_end_time_"+id).val();
            message_class = $(".allday_multi_message_"+id);
            // all day schedule get message
            settings_time_validation( start, end , message_class , input );

            break;
        case 'multi_diff_days':
            var id  = input.attr('id');
            start   = $(".multi_diff_start_time_"+id).val();
            end     = $(".multi_diff_end_time_"+id).val();
            message_class = $(".weekly_multi_message_"+id);
            // all day schedule get message
            settings_time_validation( start, end , message_class , input );

            break;

        case 'weekly':
            var id  = input.attr('id');
            start   = $(".wpc_weekly_schedule_start_time_"+id ).val();
            end     = $(".wpc_weekly_schedule_end_time_"+id ).val();
            message_class = $( ".weekly_message_"+id );

            // check day validation
            var obj = { id: id , type: "weekly", action_class: "wpc-weekly-schedule-list" ,
            input: input , message_class  };

            settings_day_validation( $ , obj );

            // weekly schedule get message
            settings_time_validation( start, end , message_class , input , id );

            break;
        case 'exceptional':
            var id  = input.attr('id');
            start   = $(".wpc_exception_start_time_"+id ).val();
            end     = $(".wpc_exception_end_time_"+id ).val();
            message_class = $( ".schedule_exception_message_"+id );
            // exceptional schedule get message
            settings_time_validation( start, end , message_class , input );

            break;

        case 'pickup':
            var id  = input.attr('id');
            start   = $(".wpc_pickup_start_time_"+id ).val();
            end     = $(".wpc_pickup_end_time_"+id ).val();
            message_class = $( ".pickup_valid_message_"+id );

            // check day validation
            var obj = { id: id , type: "pickup", action_class: "wpc-weekly-schedule-list" ,
            input: input , message_class  };

            settings_day_validation( $ , obj );

            // pickup schedule get message
            settings_time_validation( start, end , message_class , input );

            break;

        case 'delivery':
            var id  = input.attr('id');
            start   = $(".wpc_delivery_start_time_"+id ).val();
            end     = $(".wpc_delivery_end_time_"+id ).val();
            message_class = $( ".delivery_valid_message_"+id );

            // check day validation
            var obj = { id: id , type: "delivery", action_class: "wpc-weekly-schedule-list" ,
            input: input , message_class  };

            settings_day_validation( $ , obj );

            // delivery schedule get message
            settings_time_validation( start, end , message_class , input );

            break;
        default:
            break;
    }

    return response;
}

/**
 * Check if day is selected when checking time 
 */
 function settings_day_validation( $ , obj ) {
     var flag   = false;
     var day    = ['Sat','Sun','Mon','Tue','Wed','Thu','Fri'];
     var name   = "";

     $(day).each(function( index , value ) {
         switch ( obj.type ) {
             case "weekly":
                name = "wpc_weekly_schedule";
                 break;
            case "pickup":
                name = "wpc_pickup_weekly_schedule";
                break;
            case "delivery":
                name = "wpc_delivery_schedule";
            break;
             default:
                 break;
         }

         if ( $("input[name='"+name+"["+obj.id+"]["+value+"]']").is(":checked") ) {
            return flag = true;
        }


    });
    if ( flag == false ) {
        var message = typeof wpc_form_data.day_valid_message !=="undefined" && wpc_form_data.day_valid_message !="" ? wpc_form_data.day_valid_message : "Please select day first";
        // Print message
        obj.message_class.html( "" ).html( message ).fadeIn();
        obj.input.val("")
    }
    else {
        obj.message_class.html( "" ).fadeOut();
    }
}

/**
 * Get settings time validation message
 */
function settings_time_validation( start, end , message_class , input ) {
    if ( start !== "" && end !== "" ) {
        var data = compare_between_time( start , end );
        if ( data == "early" || data == "equal" ) {
            var message = typeof wpc_form_data.time_valid_message !=="undefined" && wpc_form_data.time_valid_message !="" ? wpc_form_data.time_valid_message : "End time must be after start time";
            // Print message
            message_class.html( "" ).html( message ).fadeIn();
            input.val("")
        } else {
            message_class.html( "" ).fadeOut();
        }
    }
}

function compare_between_time( start , end ) {

    let from_time   = convert_time12to24( start );
    let to_time     = convert_time12to24( end );
    to_time         = to_time == "00:00" ? "24:00": to_time;

    var startTime = moment.duration(from_time).asSeconds();
    var endTime   = moment.duration(to_time).asSeconds();

    var data = "unknown";
    if ( moment(endTime).isBefore(moment(startTime)) ) {
        data = "early";
    } else if (moment(startTime).isSame(moment(endTime))) {
        data = "equal";
    } else if (moment(endTime).isAfter(moment(startTime))) {
        data = "success";
    }

    return data
}

// copy text
function copyTextData( fieldId ){
    var fieldData = document.getElementById(fieldId);
    if( fieldData ){
        fieldData.select();
        document.execCommand("copy");
    }
}

// adding  schedule block
function add_week_block( obj ) {
    var week_days = ['Sat','Sun','Mon','Tue','Wed','Thu','Fri'];
    var html = "";
    // add schedule block
    jQuery( obj.button_wrapper ).on( 'click' , obj.button_class , function() {
        var i = jQuery( '.'+obj.second_wrapper_extra ).length;
        if( i <= 7 ){
            
            var startTimeText = jQuery(this).data("start_time");
            var endTimeText = jQuery(this).data("end_time");

            var html ="";
            jQuery( obj.append_wrapper ).append(
                '<div class="'+obj.parent_block+' '+obj.second_wrapper_extra+'  '+obj.second_wrapper_extra+'_'+i+'" data-id="'+i+'">'+
                '<div class="'+obj.second_wrapper+'">'+
                jQuery.map( week_days , function( day , key ){
                    var day_lower = day.toLowerCase();
                    html +='<input type="checkbox" name="'+obj.field_name+'['+i+']['+day+']" class="'+day_lower+'" id="'+obj.block_type+'_'+day_lower+'_'+i+'"/><label for="'+obj.block_type+'_'+day_lower+'_'+i+'">'+day+'</label>'
                })
                +html+'</div>'+
                '<div class="wpc-schedule-field">'+
                '<div class="'+obj.start_class_wrap+'"><input type="text" name="'+obj.start_time_name+'[]" class="'+obj.start_time_name+' '+obj.start_time_name+'_'+i+' '+obj.start_class+'_'+i+' wpc_mt_two wpc-mr-one wpc-settings-input attr-form-control" id='+i+' placeholder="'+ startTimeText +'" disabled /></div>'+
                '<div class="'+obj.end_class_wrap+'"><input type="text" name="'+obj.end_time_name+'[]" class="'+obj.end_time_name+' '+obj.end_time_name+'_'+i+' '+obj.end_class+'_'+i+'  wpc-settings-input attr-form-control" id='+i+' placeholder="'+ endTimeText +'" disabled /></div>'+
                '<span class="'+obj.clear_button+'" id='+i+' style="display: none;"> <span class="dashicons dashicons-update-alt wpc-tooltip" data-title="Reset fields"> <small class="wpc-tooltip-angle"></small></span> </div>'+
                '</span>'+
                '<div class="'+obj.validation_message+'_'+i+' wpc-default-guest-message"></div>'+
                '<span class="dashicons dashicons-no-alt '+obj.remove_button+' wpc-btn wpc-tooltip" data-title="Remove Weekly Schedule"> <small class="wpc-tooltip-angle"></small></span>'+
                '</div>');
            i++;
        }
    });
    return html;
}

// remove weekly reservation multi slot block
var remove_weekly_multi_slot = {
    parent_block: '.multi_schedule',
    remove_button: '.remove_weekly_schedule_block',
    removing_block: '.single-weekly-multi-schedule'
};

remove_block(remove_weekly_multi_slot);




// adding exception block
function add_exception_block( obj , block_name=false ) {
    var increase = jQuery(obj.wrapper_block).length;
    jQuery(obj.parent_block).on( 'click' , obj.button_wrapper , function() {
        increase++;
        switch (block_name) {
            case 'reservation_exception_schedule':
                var startTimeText   = jQuery(this).data("start_time");
                var endTimeText     = jQuery(this).data("end_time");
                jQuery( obj.append_wrapper ).append(
                    '<div class="'+obj.second_wrapper+' d-flex mb-2">'+
                    '<input type="text" name="'+obj.date_name+'[]" class="'+obj.date_name+' '+obj.date_name+'_'+increase+' wpc_mt_two wpc-mr-one wpc-settings-input attr-form-control" data-current_id="'+increase+'" placeholder="Date" id="'+obj.date_name+'_'+increase+'" />'+
                    '<div class="'+obj.start_class_wrap+'"><input type="text" name="'+obj.start_time_name+'[]" class="'+ obj.start_time_name +'  '+obj.start_time_name+'_'+increase+' wpc-settings-input attr-form-control" id="'+increase+'" disabled placeholder="'+ startTimeText +'" /></div>'+
                    '<div class="'+obj.end_class_wrap+'"><input type="text" name="'+obj.end_time_name+'[]" class="'+ obj.end_time_name +'  '+obj.end_time_name+'_'+ increase +' wpc-settings-input attr-form-control" id="'+increase+'" disabled placeholder="'+ endTimeText +'"/></div>'+
                    '<span class="exception_time_clear" id='+increase+' style="display: none;">  <span class="dashicons dashicons-update-alt wpc-tooltip" data-title="Reset fields"> <small class="wpc-tooltip-angle"></small></span> </span>'+
                    '<span class="wpc-btn dashicons dashicons-no-alt '+obj.remove_button+' wpc_icon_middle_position wpc-tooltip" data-title="Remove Schedule"><small class="wpc-tooltip-angle"></small></span>'+
                    '</div>'+
                    '<div class="wpc-default-guest-message '+obj.exception_message + '_' + increase+'"></div>'
                );
                 
                jQuery("#"+obj.date_name+'_'+increase).flatpickr();

                break;

            case 'cafe_app_banner':

                jQuery( obj.append_wrapper ).append(
                    '<div class="'+obj.second_wrapper+' d-flex mb-2">'+
                        `<div class="banner-img-group">
                            <input type="hidden" id="image-`+increase+`" name="`+obj.name_0+`[`+increase+`][`+obj.name_1+`]" class="custom_media_url" value="">
                            <div id="banner-image-wrapper-`+increase+`"></div>
                            <p>
                                <input type="button" class="button button-secondary add_banner_image" data-id=`+increase+` id="add_banner_image" name="add_banner_image" value="Add Banner Image" />
                                <input type="button" class="button button-secondary remove_banner_image"  data-id=`+increase+` id="remove_banner_image" name="remove_banner_image" value="Remove Banner Image" />
                            </p>
                        </div>`
                    +
                    '<input type="text" name="'+obj.name_0+'['+increase+']['+ obj.name_2 +']" class="'+ obj.name_2 +'  '+obj.name_2+'_'+increase+' wpc-settings-input attr-form-control" id="'+obj.name_2+'"/>'+
                    '<span class="wpc-btn dashicons dashicons-no-alt '+obj.remove_button+' wpc_icon_middle_position"></span>'+
                    '</div>'
                );

                break;
            default:
                break;
        }
    });
}

// remove block
function remove_block( obj ) {
    jQuery(obj.parent_block).on( 'click' , obj.remove_button , function(e) {
        e.preventDefault();
        jQuery(this).parent( obj.removing_block ).remove();
    });
}

function checkbox_default_show_hide( $, checkbox_arr ) {
    $.map( checkbox_arr, function( value , index ){
        // checkbox checked / unchecked value set
        $(value).on('change',function(){
            var get_sibling = $(this).siblings('input[type="checkbox"][value="off"]');
            if (get_sibling) {
                if ( $(this).is(':checked') ) {
                    $(this).attr('checked',true)
                    get_sibling.attr('checked',false)
                }else{
                    $(this).removeAttr('checked')
                    get_sibling.attr('checked',true)
                }
            }
        })
    } )
}


/**
 * for our purpose, two time picker need to be initialized: start time, end time
 * params: clicked_start to know which one is clicked start/end
 * params: related_picker_class is if start clicked then end picker class, but if end clicked then start picker class 
 */
function initialize_any_time_picker($, current_this = '', clicked_start = false, related_picker_class = '') {
    
    if ( related_picker_class != '' ) {

        var parent_current_time = child_current_time  = '';

        $current_val = $(current_this).val();
        $related_val = $(related_picker_class).val();

        if( clicked_start ) {
            parent_current_time = $current_val;
            child_current_time  = $related_val;
        } else {
            child_current_time  = $current_val;
            parent_current_time = $related_val;
        }

        var parent_min_time = child_min_time = '12:00AM';
        var parent_max_time = child_max_time = '11:30pm';
    
        if( parent_current_time !== '') {
            child_min_time  = calculate_min_max_time_for_picker(parent_current_time, true);
        }
        if( child_current_time !== '') {
            // parent_max_time = calculate_min_max_time_for_picker(child_current_time, false);
        }
  
        // check whether timepicker was initialized previously or not
        if( ! $(current_this).hasClass('ui-timepicker-input') ) {
            var params_start = {
                timeFormat  : 'h:i A',
                dynamic     : true,
                step        : 30, // default
                listWidth   : 1  //full width
            };
    
            let params_end = Object.assign({}, params_start);
    
            params_start['minTime'] = parent_min_time;
            params_start['maxTime'] = parent_max_time;
    
            params_end['minTime']   = child_min_time;
            params_end['maxTime']   = child_max_time;

            if( clicked_start ) {
                $(current_this).timepicker(params_start);
                $(related_picker_class).timepicker(params_end);
            } else {
                $(current_this).timepicker(params_end);
                $(related_picker_class).timepicker(params_start);
            }
        }
    }
}
    
/**
 * calculate parent max time, child min time for two related picker
 * parent_clicked means start time clicked 
 */
function calculate_min_max_time_for_picker(current_time = '', parent_clicked = true) {

    var child_min_time  = '12:00AM';
    var parent_max_time = '11:30pm';

    if( current_time != '' ) {
        var time_arr = current_time.match(/^(\d+):(\d+) ([AP]M)$/i);
        var hours    = time_arr[1];
        var minutes  = time_arr[2];
        var am_pm    = time_arr[3];

        if(parent_clicked) {
            // 30 minutes plus
            minutes = parseInt(minutes)+30;
            if(minutes == 60) { // 60 means add 1 hour and  so change minutes to 0 
                hours = parseInt(hours)+1;
                if(hours == 13) {
                    hours = 1;
                }
                minutes = '00';
            }

            child_min_time = hours+':'+minutes+am_pm;

            return child_min_time;
        } else {
            // 30 minutes less
            minutes = parseInt(minutes);
            if(minutes == 0) { // if 0 then 30 minutes should subtract from hour, so subtracted 1 from hour and changed minutes from 0 to 30
                hours = parseInt(hours)-1;
                minutes = '30';
            } else { // so minutes is 30, so subtracting 30 means minutes is 0, no need to change hour
                minutes = '00';
            }

            parent_max_time = hours+':'+minutes+am_pm;

            return parent_max_time;
        }
    }
    
}

// when no parent(day/date) is selected, disable all related fields
function disable_all_fields( related_block = '') {
    related_block.prop('disabled', true)
        .removeClass('wpc_field_error').next('.wpc_field_error_msg').remove();
}

// add error msg showing class, text for this block
function add_field_validation_error_content( $, type = '', blocks = [], disabled_attr = true ) {

    var field_error_msg = wpc_form_data[0].field_error_msg;

    switch ( type ) {
        case "day_date_checked":
            $.each(blocks, function( index, current_block ){
                if ( current_block.val() == '' && ! current_block.hasClass('wpc_field_error') ) { // after day selection, all values are empty plus there has no error class
                    current_block.addClass('wpc_field_error')
                        .after('<span class="wpc_field_error_msg">'+ field_error_msg +'</span>'); // need to localize
                        
                    if( disabled_attr ) { // remove disabled attribute for all fields except end time
                        current_block.removeAttr('disabled');
                    }
                }
            });

            break;

        case "reset_time":
            $.each(blocks, function( index, current_block ){
                if ( ! current_block.hasClass('wpc_field_error') ) { 
                    current_block.addClass('wpc_field_error')
                        .after('<span class="wpc_field_error_msg">'+ field_error_msg +'</span>'); // need to localize 
                }
                if( disabled_attr ) { // add disabled attribute for end time
                    current_block.prop('disabled', true);
                }
            });
            
            break;

        default:
            break;
    }
}

// remove error msg showing class, text for this block
function remove_field_validation_error_content( current_block = '' ) {
    if( current_block != '' && current_block.hasClass('wpc_field_error') ) {
        current_block.removeClass('wpc_field_error').next('.wpc_field_error_msg').remove();
    }
}

// show reset button when day checked
function show_reset_button(reset_button = '') {
    if( reset_button != '' && reset_button.is(":hidden") ) {
        reset_button.show();
    }
}

// show reset button when day unchecked
function hide_reset_button(reset_button = '') {
    if( reset_button != '' ) {
        reset_button.hide();
    }
}