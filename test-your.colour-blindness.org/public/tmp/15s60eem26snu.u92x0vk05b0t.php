<div class="admin-analytics">

    <h1><i class="fa fa-bug" aria-hidden="true"></i> Bug Tracker</h1>

<p><span class="big" style="font-size:24px"><?php echo $bugs_count; ?> daltonian bugs</span></p>

<table class="pure-table pure-table-horizontal pure-table-striped">
    <thead>
        <tr>
	        <th style="width:150px">Date du rapport</th>
            <th style="width:200px">URL & Titre de la page</th>
            <th style="width:100px">Tech</th>
            <th style="width:250px">Image</th>
        </tr>
    </thead>
    <tbody>
        <?php $key=0; foreach (($bugs?:array()) as $bug): $key++; ?>
            <tr >
	            <td><?php echo $bug->creation_date; ?><br>par: <?php echo $bug->profile_name; ?></td>
                <td style="max-width:100px"><a target="_blank" title="Voir la page (nouvelle fenêtre)" href="<?php echo $bug->page_url; ?>" class="truncate"><?php echo $bug->page_url; ?></a><br><?php echo $bug->page_title; ?></td>

                <td><strong>OS:</strong> <?php echo $bug->operating_system; ?><br><?php echo $browser = new Browser($bug->browser);
	                $browser->getPlatform();; ?><br><strong>Ecran:</strong> <?php echo $bug->screen_width; ?>x<?php echo $bug->screen_height; ?>
	            </td>
                <td><?php echo $bug->screenshot_description; ?><br>
	            <a href="<?php echo $bug->screenshot; ?>" target="_blank"><img src="<?php echo $bug->screenshot_cropped_result; ?>" style="max-width:100%"></a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>

<script src="/assets/js/jquery-1.12.0.min.js"></script>
<script src="/assets/js/jquery.tablesorter.js"></script>
<script type="text/javascript">
    $(function() {
        $("table").tablesorter({debug: false})
    });
</script>