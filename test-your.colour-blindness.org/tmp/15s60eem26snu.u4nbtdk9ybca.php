
<div class="pure-menu pure-menu-horizontal">
    <ul class="pure-menu-list">
        <li class="pure-menu-item <?php echo $current_url=='/admin/user' ? 'pure-menu-selected': ''; ?>"><a href="/admin/user/" class="pure-menu-link">
            <i class="fa fa-user" aria-hidden="true"></i>Mon compte</a>
        </li>
        <li class="pure-menu-item <?php echo $current_url=='/admin/users' ? 'pure-menu-selected': ''; ?>"><a href="/admin/users/" class="pure-menu-link">
            <i class="fa fa-users" aria-hidden="true"></i>Utilisateurs</a>
        </li>
        <li class="pure-menu-item <?php echo $current_url=='/admin/vetted' ? 'pure-menu-selected': ''; ?>"><a href="/admin/vetted/" class="pure-menu-link">
        	<i class="fa fa-users" aria-hidden="true"></i>Utilisateurs rencontrés</a>
        </li>
        <li class="pure-menu-item <?php echo $current_url=='/admin/tests' ? 'pure-menu-selected': ''; ?>"><a href="/admin/tests/" class="pure-menu-link">
        	<i class="fa fa-file-text" aria-hidden="true"></i>Tests</a>
        </li>
        <li class="pure-menu-item <?php echo $current_url=='/admin/analytics' ? 'pure-menu-selected': ''; ?>"><a href="/admin/analytics/" class="pure-menu-link">
            <i class="fa fa-bar-chart" aria-hidden="true"></i>Analytics</a>
        </li>
        <li class="pure-menu-item <?php echo $current_url=='/admin/bugtracker' ? 'pure-menu-selected': ''; ?>"><a href="/admin/bugtracker/" class="pure-menu-link">
            <i class="fa fa-bug" aria-hidden="true"></i>Bugtracker</a>
        </li>
        <!--
        <li class="pure-menu-item"><a href="/admin/fixdatabase/" class="pure-menu-link">
            <i class="fa fa-table" aria-hidden="true"></i>fixdatabase</a>
        </li>
        -->
        <li class="pure-menu-item <?php echo $current_url=='/admin/logout' ? 'pure-menu-selected': ''; ?>"><a href="/logout" class="pure-menu-link">
            <i class="fa fa-sign-out" aria-hidden="true"></i> Déconnection</a>
        </li>
    </ul>
</div>

