import { bot, group_id } from "./bot_var.js"
import { select_all_todo, insert_todo, select_todo, delete_todo } from "./model.js"

//ctx object
//(update[information about the chat group/sender], 
//command[the text that u write after '/' without spacing], 
//payload['the text after the command'], 
//args['the text after command in a form of array'])

bot.command('todo', async (ctx) => {
    // Explicit usage
    console.log(ctx.chat)
    if (ctx.chat.id == group_id) {

        try {
            let todo_id = Math.round(ctx.payload)
            let formattedText = '';
            if (isNaN(todo_id) || todo_id == "") {

                const my_todo = await select_all_todo();

                my_todo.forEach((item, index) => {
                    formattedText += `${index + 1}.title: ${item.title}\ndesc: ${item.description.replace(/\r\n/g, ' ')}\n`;
                });
                await ctx.reply(formattedText)

            }
            else {
                let todo = await select_todo(todo_id)

                if (todo.length == 0) {
                    await ctx.reply("no todo found")
                    return
                }

                todo.forEach((item, index) => {
                    formattedText += `${index + 1}.title: ${item.title}\ndesc: ${item.description.replace(/\r\n/g, ' ')}\n`;
                });

                await ctx.reply(formattedText)
            }
        }
        catch (error) {
            console.log('aa')
        }


    }
    else {
        await ctx.reply("u are not allowed to use me")
    }

})



bot.command('addtodo', async (ctx) => {

    const input = ctx.payload;
    const regex = /title\(([^)]+)\)\sdesc\(([^)]+)\)/;
    const matches = input.match(regex);

    if (ctx.chat.id == group_id) {

        try {
            if (matches) {
                const text1 = matches[1];
                const text2 = matches[2];
                await insert_todo(text1, text2)
                await ctx.reply(`todo title:${text1} description:${text2}`)
            } else {
                await ctx.reply("Invalid format");
            }
        }

        catch (error) {
            console.log('bb')
        }

    }
    else {
        await ctx.reply("u are not allowed to use me")
    }

})

//delete todo
bot.command('deltodo', async (ctx) => {

    const input = Math.round(ctx.payload);

    if (ctx.chat.id == group_id) {

        try {
            if (!isNaN(input)) {
                await delete_todo(input)
                await ctx.reply(`todo id:${input} deleted`)
            } else {
                await ctx.reply("Invalid format");
            }
        }

        catch (error) {
            console.log('cc')
        }

    }
    else {
        await ctx.reply("u are not allowed to use me")
    }

})


bot.launch()