const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  EmbedBuilder,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

// بيانات الشخصيات مؤقتًا
const characters = {};

client.once("ready", () => {
  console.log(`✅ البوت شغال باسم ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  try {
    // زر اختيار الشخصية
    if (interaction.isButton()) {
      if (interaction.customId === "char1") {
        const char = characters[interaction.user.id]?.char1;

        if (!char) {
          return interaction.reply({
            content: "❌ ما عندك شخصية أولى محفوظة.",
            ephemeral: true,
          });
        }

        await interaction.member.setNickname(char);

        return interaction.reply({
          content: `✅ تم تغيير اسمك إلى **${char}**`,
          ephemeral: true,
        });
      }

      if (interaction.customId === "char2") {
        const char = characters[interaction.user.id]?.char2;

        if (!char) {
          return interaction.reply({
            content: "❌ ما عندك شخصية ثانية محفوظة.",
            ephemeral: true,
          });
        }

        await interaction.member.setNickname(char);

        return interaction.reply({
          content: `✅ تم تغيير اسمك إلى **${char}**`,
          ephemeral: true,
        });
      }
    }

    // أمر إنشاء لوحة الشخصيات
    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === "characters") {
        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("char1")
            .setLabel("الشخصية الأولى")
            .setStyle(ButtonStyle.Primary),

          new ButtonBuilder()
            .setCustomId("char2")
            .setLabel("الشخصية الثانية")
            .setStyle(ButtonStyle.Secondary)
        );

        const embed = new EmbedBuilder()
          .setTitle("🎭 شخصيات الرول بلاي")
          .setDescription(
            "اختر الشخصية التي تريد استخدامها، وسيتم تغيير اسمك تلقائيًا."
          );

        await interaction.reply({
          embeds: [embed],
          components: [row],
        });
      }
    }
  } catch (error) {
    console.error(error);

    if (!interaction.replied) {
      await interaction.reply({
        content: "❌ حدث خطأ.",
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
