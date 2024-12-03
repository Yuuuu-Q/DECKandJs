// ==UserScript==
// @name         撞邪规则
// @author       YQ
// @version      1.1.0
// @description  撞邪规则
// ==/UserScript==

const zhuangxie={
    "name":"撞邪",
    "fullname":"撞邪1.9",
    "authors": ["YQ"],
    "version": "1.1.0",
    "updatedTime": "20241101",
    "templateVer": "1.1",

    "nameTemplate":{
        "zx":{
            "template":"{$t玩家_RAW} HP{HP} 阳气{阳气} 阴气{阴气}",
            "helpText": "自动设置名片"
        }
    },

    "attrConfig":{
        //stshow置顶内容
        "top":['运动','操作','思想','灵视','阳气','阴气'],
        "sortBy":"name",
        "ignores":[],
        "showAs":{
            "HP":"{HP}/{生命值}",
			"能力":"{能力}"
        },
        "setter":null,
    },
    

    "setConfig":{
        "diceSides": 8,
        "enableTip": "已切换至8面骰，开启撞邪规则扩展，相关指令为【.za】、【.吉凶】,如有疑惑可使用【.za help】、【.吉凶 help】。",
        "keys": ["撞邪","ZX","zx"],
        "relatedExt": ["zx"],
    },

    "defaults":{},
    "defaultsComputed":{
		"HP":"运动 + 思想",
        "阴气":"灵视 / 2",
        "阳气":"运动 + 操作 - 灵视",
		"移动距离":"运动 / 2"
    },
    "alias":{
        "生命值":["hp"]
    },

    "textMap": {
        "trpg-test": {
            "设置测试_成功": [
                ["设置完成", 1]
            ]
        }
    },
    "textMapHelpInfo": null
}

try {
    seal.gameSystem.newTemplate(JSON.stringify(zhuangxie))
} catch (e) {
    // 如果扩展已存在，或加载失败，那么会走到这里
    console.log(e)
}
let ext = seal.ext.find('zx');
if (!seal.ext.find('zx')) 
{// 不存在，那么建立扩展，名为 test，作者“木落”，版本 1.0.0
  ext = seal.ext.new('zx', '', '1.0.0');
  // 注册扩展
  seal.ext.register(ext);
}

function makecheck(ctx,value,dic) {
    let check=value;
    //checkit
    let dice=dic;
    let text0=`${dice}/${seal.format(ctx,`${value}`)}`;
    let text='';
    if (dice<=(check)){
        text=seal.formatTmpl(ctx,'COC:判定_成功_普通');
    }
    else if (dice>(check)){
        text=seal.formatTmpl(ctx,'COC:判定_失败');
    }
    text0 += ' '+ text ;
    return text0;  
}

function makecheckjx(ctx,value1,value2,dic) {
    let check1=value1;
	let check2=value2;
    //checkit
    let dice=dic;
    let text0=`影响骰的结果为：${dice}`;
    let text='';
	let text1='';
    if (dice == check1){
        text='吉';
		text1 = seal.formatTmpl(ctx,'COC:判定_大成功');
    }
    else if (dice == check2){
        text='凶';
		text1 = seal.formatTmpl(ctx,'COC:判定_大失败');
    }
	else{
	    text='中';
	}
    text0+=' ' + text
    return text0;  
}

const cmdxj = seal.ext.newCmdItemInfo();
cmdxj.name = '凶吉','吉凶'; // 指令名字，可用中文
cmdxj.help = '设定本次游戏中的吉凶值';

cmdxj.solve = (ctx, msg, cmdArgs) => {
	let val = cmdArgs.getArgN(1);
	switch (val) {
	    case 'help': 
		case '': {
			help = '1.rd8决定此次游戏中的吉凶值。2.使用指令.吉凶/.凶吉 + 数字设定吉凶值。3.使用指令.吉凶 show展示当前吉凶值。4.使用指令.吉凶 clear清空当前群组吉凶值。'
			seal.replyToSender(ctx, msg, help)
			break
		}
		case 'show':{
			seal.replyToSender(ctx, msg, '吉值=' + seal.format(ctx,"{$g吉值}") + '\n凶值=' + seal.format(ctx,"{$g凶值}"));
			break
			}
		case 'clear':{
			seal.vars.intSet(ctx, `$g吉值`, 0);
			seal.vars.intSet(ctx, `$g凶值`, 0);
			seal.replyToSender(ctx, msg, '吉值=' + seal.format(ctx,"{$g吉值}") + '\n凶值=' + seal.format(ctx,"{$g凶值}"));
			break
			}
		case '1':{
				seal.vars.intSet(ctx, `$g吉值`, 1);
				seal.replyToSender(ctx, msg, '吉值=' + seal.format(ctx,"{$g吉值}"));
				break
			}
		case '2':{
				seal.vars.intSet(ctx, `$g吉值`, 2);
				seal.replyToSender(ctx, msg, '吉值=' + seal.format(ctx,"{$g吉值}"));
				break
			}
		case '3':{
				seal.vars.intSet(ctx, `$g吉值`, 3);
				seal.replyToSender(ctx, msg, '吉值=' + seal.format(ctx,"{$g吉值}"));
				break
			}
		case '4':{
				seal.vars.intSet(ctx, `$g吉值`, 4);
				seal.replyToSender(ctx, msg, '吉值=' + seal.format(ctx,"{$g吉值}"));
				break
			}
		case '5':{
				seal.vars.intSet(ctx, `$g凶值`, 5);
				seal.replyToSender(ctx, msg, '凶值=' + seal.format(ctx,"{$g凶值}"));
				break
			}
		case '6':{
				seal.vars.intSet(ctx, `$g凶值`, 6);
				seal.replyToSender(ctx, msg, '凶值=' + seal.format(ctx,"{$g凶值}"));
				break
			}
		case '7':{
				seal.vars.intSet(ctx, `$g凶值`, 7);
				seal.replyToSender(ctx, msg, '凶值=' + seal.format(ctx,"{$g凶值}"));
				break
			}
		case '8':{
				seal.vars.intSet(ctx, `$g凶值`, 8);
				seal.replyToSender(ctx, msg, '凶值=' + seal.format(ctx,"{$g凶值}"));
				break
			}
  }
};
ext.cmdMap['凶吉'] = cmdxj;
ext.cmdMap['吉凶'] = cmdxj;

const cmd = seal.ext.newCmdItemInfo();
cmd.name = 'za'; // 指令名字，可用中文
cmd.help = '.za <属性> (数值)//进行鉴定\n.za <属性> (数值) @//进行代骰鉴定\n使用前请先使用.吉凶指令录入吉值与凶值';
cmd.allowDelegate = true;
cmd.solve = (ctx, msg, cmdArgs) => {
    //获取代骰数据
    let mctx=seal.getCtxProxyFirst(ctx,cmdArgs);
    let val = cmdArgs.getArgN(1);
    switch (val) {
        case '':
        case 'help': {
            const ret = seal.ext.newCmdExecuteResult(true);
            ret.showHelp = true;
            return ret;
        }
        default: {
            //计算判定用的值
            let check=0;
            if (!parseInt(val)){
                if (parseInt(cmdArgs.getArgN(2))){
                    check=parseInt(cmdArgs.getArgN(2))
                }
                else{check=seal.format(mctx,`{${val}}`)}
            }
            else{
                check=parseInt(val);
            };
            //用函数进行判定
            let print0=makecheck(mctx,check,seal.format(ctx,`{1d8}`));
			let print1=makecheckjx(mctx,seal.format(ctx,"{$g吉值}"),seal.format(ctx,"{$g凶值}"),seal.format(ctx,`{1d8}`));
			print = print0 + "\n" + print1
            seal.replyToSender(mctx, msg, `${seal.format(mctx,'{$t玩家}')}：${print}`);
            return seal.ext.newCmdExecuteResult(true);
        }
    }
};
// 将命令注册到扩展中
ext.cmdMap['za'] = cmd;