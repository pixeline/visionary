<h1>Mon profil</h1>


<form action="/admin/user" method="POST" class="form pure-form pure-form-stacked form--register text-left">
    <h2>Inscription</h2>
    <div class="pure-g">
        <div class="pure-u-1 pure-u-sm-1-2">
            <label for="name">Prénom et nom <span class="voice--whisper">* obligatoire</span></label>
            <input type="text" id="name" name="name" placeholder="Votre prénom et nom" autocomplete="name" value="<?php echo $user->name; ?>" required>
        
            <label for="email">Email <span class="voice--whisper">* obligatoire</span></label>
            <input type="email" id="email" name="email" placeholder="Votre email" value="<?php echo $user->email; ?>" autocomplete="email" required>
        </div>

        <div class="pure-u-1 pure-u-sm-1-2">
            <fieldset class="border-left gutter--left">
                <label for="country">Pays de votre naissance</label>
                <select id="country" name="countries_iso" >
                    <?php $key=0; foreach (($countries?:array()) as $country): $key++; ?>
                        <?php if ($country['iso'] == $user->countries_iso): ?>
                            
                                <option value="<?php echo $country['iso']; ?>" selected><?php echo $country['country_name']; ?></option>
                            
                            <?php else: ?>
                               <option value="<?php echo $country['iso']; ?>"><?php echo $country['country_name']; ?></option>
                            
                        <?php endif; ?>
                    <?php endforeach; ?>
                </select>

                <label for="city">Code postal</label>
                <input type="text" id="postcode" name="postcode" autocomplete="postal-code" size="8" placeholder="(ex: 5000)" value="<?php echo $user->postcode; ?>">  
            
                <label for="birth_date">Année de naissance <span class="voice--whisper">* obligatoire</span></label>

                <select id="birth_date" name="birth_date" required placeholder="Année de naissance">years
                    <option disabled>Année de naissance</option>
                    <?php $key=0; foreach (($years?:array()) as $year): $key++; ?>
                        <?php if ($year == $user->birth_date): ?>
                            
                                <option value="<?php echo $year; ?>" selected><?php echo $year; ?></option>
                            
                            <?php else: ?>
                               <option value="<?php echo $year; ?>"><?php echo $year; ?></option>
                            
                        <?php endif; ?>
                    <?php endforeach; ?>
                </select>

                <div class="pure-g">
                    <div class="pure-u-1">
                        <label class="pure-radio">Genre 
                            <span class="voice--whisper">* obligatoire</span>
                        </label>
                    </div>
                    <div class="pure-u-1 pure-u-sm-1-3 pure-u-lg-5-24">
                        <label for="male" class="pure-radio"> 
                            <input id="male" type="radio" name="gender" value="M" <?php echo $user->gender == 'M' ? 'checked' : ''; ?>> 
                            Homme
                        </label>
                    </div>
                    <div class="pure-u-1 pure-u-sm-1-3 pure-u-lg-5-24">
                        <label for="female" class="pure-radio">
                            <input id="female" type="radio" name="gender" value="F" <?php echo $user->gender == 'F' ? 'checked' : ''; ?>> 
                            Femme
                        </label>
                    </div>  
                </div>
                
            </fieldset>
        </div>
        
    </div>
    <input type="hidden" name="id" value="<?php echo $user->id; ?>"> 
    <input type="submit" class="pure-button pure-button-primary" value="Modifier">
</form>


<h1>Mes tests</h1>
<div class="pure-g">
	<div class="pure-u-1">
        <table class="pure-table pure-table-horizontal block-full">
            <thead>
                <tr>
                    <th>Résultat</th>
                    <th>Niveau</th>
                    <th>Date de fin</th>
                    <th>Temps</th>
                    <th>Confiant</th>
                    <th>Terminé</th>
                    <th>Voir</th>
                </tr>
            </thead>
            <tbody>
            <?php $key=0; foreach (($tests?:array()) as $test): $key++; ?>
                <tr class="<?php echo $key%2 ? '' : 'pure-table-odd'; ?>">
                    <!--<td><?php echo $test->diag_serie; ?></td>-->
                    <td><?php echo $test->diag_result; ?></td>
                    <td><?php echo $test->diag_ratio; ?></td>
                    <td><?php echo $test->test_end_date; ?></td>
                    <td><?php echo $test->test_duration; ?></td>
                    <td><?php echo $test->is_sure ? "Oui" : "Non"; ?></td>
                    <td><?php echo $test->finished ? "Oui" : "Non"; ?></td>
                    <td><a href="/admin/test/<?php echo @$test->unique_url; ?>">Voir</a></td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>

        <p>
            <a class="pure-button pure-button-primary" href="/test">
                <i class="fa fa-play" aria-hidden="true"></i> Faire un autre test
            </a>
        </p>
	</div>
</div>

   