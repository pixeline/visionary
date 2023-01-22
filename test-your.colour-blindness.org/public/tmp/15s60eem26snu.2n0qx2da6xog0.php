
<h1><i class="fa fa-users" aria-hidden="true"></i> Utilisateurs rencontrés</h1>

<p>Vetted users count : <?php echo $users_count; ?></p>

<table class="pure-table center tablesorter">
    <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Diagnostic</th>
            <th>tests date</th>
            <th>Finished</th>
        </tr>
    </thead>
    <tbody>
        <?php $key=0; foreach (($users?:array()) as $user): $key++; ?>
            <tr class="<?php echo $key%2 ? '' : 'pure-table-odd'; ?> " >
                <td><?php echo $user->id; ?></td>
                <td><?php echo $user->name; ?></td>
                <td><?php echo $user->email; ?></td>
                <td><?php echo $user->tests_diagnostic; ?></td>
                <td><?php echo $user->tests_date; ?></td>
                <td><?php echo $user->tests_done ? "Finished" : "Not done yet"; ?></td>
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

