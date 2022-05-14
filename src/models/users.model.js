const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define(
    'users',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      family: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false
      },
      expertiseId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'expertise_id'
      },
      userTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'user_type_id'
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      wallet: {
        type: DataTypes.DOUBLE(15, 2),
        allowNull: true,
        field: 'wallet'
      },
      walletChange: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'wallet_change'
      },
      telegramId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'telegram_id'
      },
      bankShabaNo: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'bank_shaba_no'
      },
      bankCardNo: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'bank_card_no'
      },
      gender: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'gender'
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'lat'
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'lng'
      },
      jobId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'job_id'
      },
      expertiseOther: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'expertise_other'
      },
      rate: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        field: 'rate'
      },
      createdAt: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'updated_at'
      },
      deletedAt: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'deleted_at'
      },
      content: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'content'
      },
      books: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'books'
      },
      fames: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'fames'
      },
      platform: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'platform'
      },
      deviceId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'device_id'
      },
      firebaseToken: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'firebase_token'
      },
      iosFirebaseToken: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'ios_firebase_token'
      },
      online: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'online'
      },
      allowIssue: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'allow_issue'
      },
      allowEvent: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'allow_event'
      },
      allowPhone: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'allow_phone'
      },
      allowFace: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'allow_face'
      },
      priceChat: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        field: 'price_chat'
      },
      pricePhone: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        field: 'price_phone'
      },
      priceFace: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        field: 'price_face'
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'status'
      },
      allowWork: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'allow_work'
      },
      confirmCode: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'confirm_code'
      },
      nationalCode: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'national_code'
      },
      avatarChanaged: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'avatar_changed'
      },
      mobileConfirm: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'mobile_confirm'
      },
      refId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'ref_id'
      },
      maxQuestionCountAllowed: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'max_question_count_allowed'
      },
      questionCountRemained: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'question_count_remained'
      },
    },
    {
      timestamps: false,
      getterMethods: {
        avatar() {
          return '/user.png';
        },
        fullName() {
          return this.name + '' + this.family;
        }
      }
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    }
  );

  // eslint-disable-next-line no-unused-vars
  users.associate = function(models) {
    users.belongsTo(models.userTypes);
    users.belongsToMany(models.expertises, {
      through: models.expertiseUser,
      foreignKey: 'userId'
    });
    users.hasMany(models.events, {
      as: 'events',
      foreignKey: 'userId',
      sourceKey: 'id'
    });
    users.hasMany(models.events, {
      as: 'reserves',
      foreignKey: 'reservedId',
      sourceKey: 'id'
    });
    users.hasMany(models.files);
    users.hasMany(models.orders);
  };

  return users;
};
