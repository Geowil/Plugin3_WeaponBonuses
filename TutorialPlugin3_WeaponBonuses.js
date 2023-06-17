/*:
* @plugindesc Core plugin for plugins created by LMPGames
* @author LMPGames
*
*
* @param Enable Weapon Bonuses
* @desc When enabled, calculates damage using weapon bonuses
* @type boolean
* @default false
*
*
* @help
*/

var tutorialCore = tutorialCore || {};
const tutorialPluginWeaponBonusesParam = PluginManager.parameters('TutorialPlugin3_WeaponBonuses');
tutorialCore.pluginParams.weaponBonuses = {};

var weaponBonusParams = tutorialCore.pluginParams.weaponBonuses;
weaponBonusParams.isSystemEnabled = (tutorialPluginWeaponBonusesParam['Enable Weapon Bonuses'] === "true");


/* Plugin Commands */
var tutorialPluginWeaponBonuses_GameInterpreter_PluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
	if (command == "TutorialPlugin.WeaponBonuses") {
		let argString = "";
		for (let arg of args) {
			argString += " " + arg;
		}

		command += argString;

		let enableCommand = /TutorialPlugin.WeaponBonuses[ ]EnableWeaponBonuses[ ](\d+)/;
		let enableCommandMatches = command.match(enableCommand) || [];

		if (enableCommandMatches.length > 1) {
			changeSystemStatus(enableCommandMatches[1]);
		}
	} else {
		tutorialPluginWeaponBonuses_GameInterpreter_PluginCommand.call(this, command, args);
	}
}


/* Game_Action Aliases & Functions */
var tutorialPluginWeaponBonuses_GameAction_MakeDamageValue = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue = function(target, critical) {
	let value = tutorialPluginWeaponBonuses_GameAction_MakeDamageValue.call(this, target, critical);
	let newValue = 0;
	if (weaponBonusParams.isSystemEnabled) {
		if (this.subject() && this.subject().constructor == Game_Actor) {
			let gameActor = this.subject();
			let weaponId = gameActor._equips[0]._itemId;
			let weaponPluginData = tutorialCore.pluginNotetagData.weaponData.find(wep => wep && wep.id == weaponId);
			if (weaponPluginData) {
				if (this.isAttack() || this.isSkill()) {
					let skillId = this._item._itemId;
					let skillData = $dataSkills.find(skill => skill && skill.id == skillId);
					if (skillData) {
						if (weaponPluginData.skillTypeId == -1 ||
							weaponPluginData.skillTypeId == skillData.stypeId) {
							let bonus = weaponPluginData.bonus;
							newValue = eval(weaponPluginData.bonusFormula);
							return newValue;
						}
					}
				}
			}
		}
	}

	return value;
}




/* Utility Functions */
function changeSystemStatus(status) {
	weaponBonusParams.isSystemEnabled = status;
}


