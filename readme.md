# Weapon Bonuses Plugin
This plugin allows you to give weapon's damage bonuses based on the type of skill being used during an attack.  Makes use of a notetag to set a bonus decimal and the formula to calculate the new damage.


Version: 1.0

[Plugin Demo](http://www.lmpgames.com/RMMV/Plugins/Demos/TutorialPlugin3_WeaponBonuses_Demo_V1.0.zip)

[Plugin Project](http://www.lmpgames.com/RMMV/Plugins/Projects/TutorialPlugin3_WeaponBonuses_Project_V1.0.zip)

Conflicts: None identified thus far.

Terms of use: Free non-commercial or commercial use; just give credit.


## Installing the plugin
Download the plugin file either from this repository or from the project or demo linked above.  Place the .js file into your js/plugins folder and then add the plugin to your project through the plugin manager.

#### Required Plugins
The TutorialPlugin2_CorePlugin is required for this plugin.  You can locate it in the link below.  Make sure this plugin is placed above this plugin.

[Core Plugin](https://github.com/Geowil/Plugin2_CorePlugin)



## Plugin Information
This section contains information about how to use this plugin.  This may include plugin settings, commands, configuration details, and information about notetags.


### Plugin Settings
#### Enable Weapon Bounses
This setting controls if the weapon bonus damage system is enabled or not.  
Boolean  
On


### Plugin Commands
#### TutorialPlugin.WeaponBonuses EnableWeaponBonuses <0/1>
This plugin command allows you to turn the system on or off from within game.  

**Parameters**  
- 0/1
- Sets if the system should be enabled or disabled.  0 = off / 1 = on

**Example**
```
TutorialPlugin.WeaponBonuses EnableWeaponBonuses 1
```


### Notetags
#### Weapons
This plugin uses a weapon notetag to set up configuration data per-weapon.  If you only want specific weapons to use this system, include a notetag on just those weapons.  

##### Attributes
**Bonus**  
Decimal  

Sets the damage bonus to be applied using the formula.  The default formula treats this value as a decimal and a percentage of the total damage done.  So if you set Bonus to 2, what you will get is the total damage done * 2, or three times the original damage.  

0.5  
<br/>

**BonusFormula**  
String  
**required**  

Sets the formula to be used to modify the final attack damage.  

Please note that the word 'bonus' MUST be present in this formula for the Bonus attribute to be used in the calculation.  

Please also note that the word 'value' is REQUIRED; if you do not include this, your damage will be calculated without taking the original damage into account.  

It is recommended to use either Math.floor (round down to the nearest 1-s place) or Math.ceil (round up to the nearest 1-s place) to avoid fractional damage (1.5312 damage).  

Math.floor(value + (value * bonus))  
<br/>

**SkillType**  
Integer  
**required**  

This value determines the skill type the bonus should be applied to.  Please consult the list below for more details.  

- -1
	- Use -1 to make the bonus apply to ALL skills
- 0
	- Use 0 when you want the bonus to apple to only normal attacks (like Attack or any skill with the Skill Type set to None).
- 1-x
	- Values of 1 or greater are dependent on your Skill Types list in the Types tab of the database.  In terms of default values, 1 would be Magic and 2 would be Special.
	
**Examples**  
```
<TutorialPlugin3_WeaponBonuses>
Bonus:0.25
BonusFormula:Math.floor(value + (value * bonus))
SkillType:-1
</TutorialPlugin3_WeaponBonuses>
```  

In the above example, the weapon with this notetag would add 25% to all damage done by the character weilding it.  
<br/>

```
<TutorialPlugin3_WeaponBonuses>
Bonus:1.68
BonusFormula:Math.floor(value + (value * bonus))
SkillType:1
</TutorialPlugin3_WeaponBonuses>
```  

In the example above, the weapon with this notetag would add a 168% damage bonus to all magic attacks done by the character weilding it; assuming 1 is used as a magic skill type.  
<br/>

```
<TutorialPlugin3_WeaponBonuses>
Bonus:1.68
BonusFormula:Math.floor(value + ((value * bonus) * (this.subject()._level / 2)))
SkillType:1
</TutorialPlugin3_WeaponBonuses>
```  

In the example above we have modified the BonusFormula.  This is an example of an advanced formula, these kinds of formuls require knowledge of how the Game_Actor class is used when damage is being calculated and the variables available to you to access.  In this example, we have added a level modifier to the bonus.  We multiply the calculated damage bonus with the level divided by 2 of the character that attacked.  

So if we did 50 original damage (value) and our bonus is 1.68, the calculated damage with the original formual would be 134.  For our new formula though, if the character attcking was level 8, the damage would calculate out to 386.  If the character was level 4, it would be 218.  

With the inclusion of the attacking character's level, we have made the bonus damage variable to each character based on their level, giving the weapon better utilization on a higher level character.  This then gives the player more equipment loadout options and may even force the player to have to think about how best to build out a character with an array of varied weapon bonuses.


## Planned Feature Enhancements
None, any enhancements will be made to an official plugin


## Conflicts
Any plugin that aliases Game_Action.prototype.makeDamageValue may conflict or interfere with this plugin in other ways without investigation into that plugin and a possible patch or integration.  

There are no known conflicts as of this time.


## Version Changelog
- Version 1.0
  - Initial version of the plugin