/* Enable the first step */
$('#welcome').fadeIn('slow').data('is-active', true);
$('#sidebar-ul a[href="#welcome"]').addClass('active');

/* Sidebar links handling */
$('a[href*="#"][class*="navigator"]').on('click', event => {
    let section_id = $(event.currentTarget).attr('href').replace('#', '');

    /* Make sure the user didnt click on the same tab multiple times */
    let is_active = $(`#content section[id="${section_id}"]`).data('is-active');

    if(!is_active) {
        /* Hide all sections */
        $('#content section').hide();

        /* Disable the previous active section */
        $('#content section').data('is-active', false);

        /* Display the one that was clicked and activate it */
        $(`#content section[id="${section_id}"]`).fadeIn('slow').data('is-active', true);

        /* Display the sidebar item if not already */
        let sidebar_a =  $(`#sidebar-ul a[href="#${section_id}"]`);
        sidebar_a.fadeIn('slow');

        if(!sidebar_a.hasClass('active')) {

            /* Disable all other active classes on the sidebar */
            $('#sidebar-ul a').removeClass('active');

            /* Make the new link active */
            sidebar_a.addClass('active');
        }
    }

    event.preventDefault();
});

/* MAke sure the url has a trailing slash */
$('#url').on('change', event => {
    let input = $(event.currentTarget).val();

    if(!input.endsWith('/')) {
        $(event.currentTarget).val(`${input}/`);
    }
});

/* Form handling for the installation */
$('#setup_form').on('submit', event => {
    let data = $('#setup_form').serialize();

    $.ajax({
        type: 'POST',
        url: 'install.php',
        data: data,
        success: data => {
            if(data.status == 'error') {
                alert(data.message);
            }

            else if(data.status == 'success') {
                $('#sidebar-ul a[href="#finish"]').trigger('click');

                /* Add the written url in the finish section */
                let url = $('#setup_form [name="url"]').val();

                $('#final_url').text(url).attr('href', url);

            }
        },
        dataType: 'json'
    });

    event.preventDefault();
});

$(document).ready(() => {
    /* Submit disable after 1 click */
    $('[type=submit][name=submit]').on('click', (event) => {
        $(event.currentTarget).addClass('disabled');

        let text = $(event.currentTarget).text();
        let loader = '<div class="spinner-grow spinner-grow-sm"><span class="sr-only">Loading...</span></div>';
        $(event.currentTarget).html(loader);

        setTimeout(() => {
            $(event.currentTarget).removeClass('disabled');
            $(event.currentTarget).text(text);
        }, 3000);

    });
});
