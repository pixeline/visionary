
<h1><i class="fa fa-users" aria-hidden="true"></i> Utilisateurs</h1>

<p>Users count : <?php echo $users_count; ?></p>

<table class="pure-table pure-table-horizontal tablesorter">
    <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Postcode</th>
            <th>Country</th>
            <th>Last login</th>
            <th>Vetted</th>
        </tr>
    </thead>
    <tbody>
        <?php $key=0; foreach (($users?:array()) as $user): $key++; ?>
            <tr class="<?php echo $key%2 ? '' : 'pure-table-odd'; ?>">
                <td><?php echo $user->id; ?></td>
                <td><?php echo $user->name; ?></td>
                <td><?php echo $user->email; ?></td>
                <td><?php echo date("Y") - $user->birth_date; ?></td>
                <td><?php echo $user->gender == "M" ? "Homme":"Femme"; ?></td>
                <td><?php echo $user->postcode; ?></td>
                <td><?php echo $user->countries_iso; ?></td>
                <td><?php echo $user->last_login; ?></td>
                <td><?php echo $user->vetted ? "Invited" : "Normal"; ?></td>
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