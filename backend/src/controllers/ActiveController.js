const rp = require('request-promise');
const cheerio = require('cheerio');

const Active = require('../models/Active');
const User = require('../models/User');

module.exports = {
  async listActives(request, response) {
    const { user_id } = request.params;

    const actives = await User.findByPk(user_id, {
      include: { association: 'active' }
    });

    if(!actives) {
      return response.json({ error: true });
    }

    for(let i = 0; i < actives.active.length; i++) {
      if(actives.active[i].name !== 'RF') {
        const data = await rp(`${process.env.LINK_STOCKS}${actives.active[i].name}`);

        let $ = cheerio.load(data);
        const price = $(`strong[class=value]`)[0].children[0].data;

        const formatPrice = price.replace(',', '.');

        actives.active[i].price = eval(`${formatPrice} + 0`);
        actives.active[i].patrimonyHere = actives.active[i].price * actives.active[i].amount;
      }
    }

    let patrimony = 0;
    let percentageGoalTotal = 0;

    const arrayValues = actives.active.map((value, index) => {
      return {
        patrimonyHereValues: value.patrimonyHere,
        percentageGoalValues: value.percentageGoal,
      };
    });

    for(let i = 0; i < arrayValues.length; i++) {
      patrimony+= arrayValues[i].patrimonyHereValues;
      percentageGoalTotal+= arrayValues[i].percentageGoalValues;
    }

    return response.json( { actives: actives.active, patrimony, percentageGoalTotal });
  }, 

  async addActive(request, response) {
    const { user_id } = request.params;
    const { name, price, amount, patrimonyHere, percentageGoal, currentPercentage } = request.body;

    if(name === 'RF') {
      const rf = await Active.create({
        name,
        price,
        amount: 0,
        patrimonyHere,
        percentageGoal,
        currentPercentage,
        user_id: parseInt(user_id),
      });

      return response.json(rf);
    }

    const active = await Active.create({
      name,
      price,
      amount,
      patrimonyHere,
      percentageGoal,
      currentPercentage,
      user_id: parseInt(user_id),
    });

    return response.json(active);
  },

  async updateActive(request, response) {
    const { name, price, amount, patrimonyHere, percentageGoal, currentPercentage, active_id } = request.body;

    const active = await Active.update({
      name,
      price, 
      amount,
      patrimonyHere,
      percentageGoal, 
      currentPercentage,
    }, {
      where: {
        id: active_id,
      } 
    });

    response.json(active);
  },

  async deleteActive(request, response) {
    const activeDelete = await Active.destroy({
      where: {
        id: request.params.active_id
      }
    });

    response.json(activeDelete);
  },

  async getPriceActive(request, response) {
    const { name } = request.body;

    const actives = ['EQTL3', 'ENBR3', 'ABEV3', 'PGMN3', 'LAVV3', 'LJQQ3', 'DMVF3', 'SOMA3', 'RIVA3', 'AMBP3',
      'ALPK3', 'MTRE3', 'MDNE3', 'BDLL4', 'BDLL3', 'STBP3', 'RAPT4', 'RAPT3', 'EGIE3',
      'MMXM3', 'MMXM11', 'LUPA3', 'INEP3', 'INEP4', 'GEPA3', 'GEPA4', 'FRAS3', 'AFLT3',
      'SHUL3', 'SHUL4', 'TASA3', 'TASA4', 'TCSA3', 'UNIP3', 'WHRL4', 'WHRL3', 'OFSA3',
      'GOLL4', 'ETER3', 'VLID3', 'TPIS3', 'PTBL3', 'POMO3', 'POMO4', 'RLOG3', 'EALT4',
      'ENEV3', 'WEGE3', 'VVAR3', 'RAIL3', 'VALE3', 'USIM3', 'USIM5', 'USIM6', 'EALT3',
      'STBP3', 'RANI3', 'CCRO3', 'AZUL4', 'CEDO3', 'CEDO4', 'RDNI3', 'SLED3', 'SLED4',
      'RSID3', 'MNDL3', 'LEVE3', 'CTKA3', 'CTKA4', 'MYPK3', 'GRND3', 'LCAM3', 'CEAB3',
      'LLIS3', 'CGRA3', 'CGRA4', 'ESTR3', 'ESTR4', 'DIRR3', 'CTNM3', 'CTNM4', 'ANIM3',
      'EVEN3', 'AMAR3', 'MOVI3', 'JHSF3', 'HBOR3', 'PDGR3', 'ARZZ3', 'EZTC3', 'HGTX3',
      'ALPA3', 'ALPA4', 'SMLS3', 'RENT3', 'MRVE3', 'MGLU3', 'LREN3', 'COGN3', 'TCSA3',
      'SEER3', 'LAME3', 'LAME4', 'HOOT4', 'GFSA3', 'YDUQ3', 'CYRE3', 'CVCB3', 'SMTO3',
      'MDIA3', 'CAML3', 'AGRO3', 'BSEV3', 'BEEF3', 'BEEF11', 'VIVA3', 'CRFB3', 'PCAR3',
      'PCAR4', 'NTCO3', 'MRFG3', 'JBSS3', 'BRFS3', 'BSLI3', 'BSLI4', 'BTTL3', 'BPAR3',
      'SCAR3', 'LPSB3', 'BMGB4', 'BMGB11', 'IGBR3', 'GSHP3', 'PSSA3', 'CARD3', 'BBRK3',
      'BRPR3', 'BRSR3', 'BIDI3', 'BIDI4', 'BIDI11', 'SANB3', 'SANB4', 'SANB11', 'MULT3',
      'ITUB3', 'ITUB4', 'ALSO3', 'LOGG3', 'ITSA3', 'ITSA4', 'IRBR3', 'IGTA3', 'BBDC3',
      'BBDC4', 'BRML3', 'APER3', 'BBSE3', 'BPAN4', 'BBAS3', 'PMAM3', 'FESA3', 'FESA4',
      'EUCA3', 'EUCA4', 'SUZB3', 'KLBN3', 'KLBN4', 'KLBN11', 'UNIP5', 'UNIP6', 'GOAU4',
      'CSNA3', 'RANI4', 'BRKM3', 'BRKM5', 'BRKM6', 'BRAP3', 'BRAP4', 'PRIO3', 'OSXB3',
      'DMMO3', 'DMMO11', 'RPMG3', 'UGPA3', 'PETR3', 'PETR4', 'BRDT3', 'ENAT3', 'PARD3',
      'BIOM3', 'BALM3', 'BALM4', 'PNVL3', 'PNVL4', 'AALR3', 'ODPV3', 'RADL3', 'QUAL3',
      'HYPE3', 'FLRY3', 'LWSA3', 'TOTS3', 'LINX3', 'POSI3', 'OIBR3', 'OIBR4', 'TIMP3',
      'VIVT3', 'VIVT4', 'TELB3', 'TELB4', 'CEPE3', 'CEPE5', 'CEPE6', 'CEED3', 'CEED4',
      'EEEL3', 'EEEL4', 'CASN3', 'CASN4', 'CEGR3', 'CEBR3', 'CEBR5', 'CEBR6', 'RNEW3',
      'RNEW4', 'RNEW11', 'COCE3', 'COCE5', 'COCE6', 'CLSC3', 'CLSC4', 'ALUP3', 'ALUP4',
      'ALUP11', 'SAPR3', 'SAPR4', 'SAPR11', 'CPRE3', 'CPLE3', 'CPLE5', 'CPLE6', 'CPFE3',
      'CGAS3', 'CGAS5', 'TIET3', 'TIET4', 'TIET11', 'NEOE3', 'TRPL3', 'TRPL4', 'TAEE3',
      'TAEE4', 'TAEE11', 'RNEW11', 'GEPA3', 'GEPA4', 'CESP3', 'CESP5', 'CESP6', 'CMIG3',
      'CMIG4', 'AFLT3', 'SQIA3',

      'FPAB11', 'ABCP11', 'BPFF11', 'AFCR11', 'ALZR11', 'FAMB11B', 'ANCR11B', 'FAED11',
      'ARFI11B', 'AQLL11', 'FATN11', 'ARRI11', 'BVAR11', 'BNFS11', 'BARI11', 'BBRC11',
      'RDPD11', 'BBPO11', 'BBFI11B', 'RNDP11', 'BBIM11', 'BCFF11', 'BRCR11', 'BCIA11', 'BCRI11',
      'BLCP11', 'BLMO11', 'THRA11', 'BMLC11B', 'BMII11', 'BREV11', 'BRCO11', 'BRHT11B',
      'BPRP11', 'BZLI11', 'BTCR11', 'BPML11', 'BTLG11', 'CBOP11', 'BBVJ11', 'CTXT11',
      'FCFL11', 'CPFF11', 'CPTS11B', 'CNES11', 'CEOC11', 'HCRI11', 'HGCR11', 'HGFF11', 'HGLG11',
      'HGRU11', 'HGPO11', 'CXCE11B', 'CRFF11', 'CXRI11', 'CXTL11', 'PQDP11', 'CARE11', 'DAMT11B', 'FISD11',
      'DOMC11', 'DOVL11B', 'ELDO11B', 'ERPA11', 'EURO11', 'KINP11', 'FEXC11', 'VRTA11', 'FLRP11',
      'IBFF11', 'GTWR11', 'EDGA11', 'GESE11B', 'FIGS11', 'GSFI11', 'GGRC11', 'RCFA11', 'HUSC11',
      'HABT11', 'HBTT11', 'ATSA11', 'ATCR11', 'HCTR11', 'HPDP11', 'HGBS11', 'HLOG11',
      'HMOC11', 'HGRE11', 'SHPH11', 'HTMX11', 'HOSI11', 'HRDF11', 'HSML11', 'TFOF11', 'HFOF11', 'HUSI11',
      'FIIB11', 'FINF11', 'BICR11', 'IRDM11', 'RBBV11', 'JPPC11', 'JPPA11', 'JSRE11', 'JTPR11',
      'KNRE11', 'KNRI11', 'KNHY11', 'KNIP11', 'KNCR11', 'KFOF11', 'LATR11B', 'LASC11', 'LGCP11', 'LOFT11B',
      'NSLU11', 'GRLV11', 'LUGG11', 'DMAC11', 'MALL11', 'MCCI11', 'MAXR11', 'MXRF11', 'FMOF11', 'MBRF11',
      'MFII11', 'MGFF11', 'MGHT11', 'MORE11', 'DRIT11B', 'HBRH11',
      'PRTS11', 'SHOP11', 'NCHB11', 'NPAR11', 'NEWL11', 'NEWU11', 'NVIF11B', 'NVHO11', 'VLOL11',
      'FTCE11B', 'OUFF11', 'OUJP11', 'OUCY11', 'OULG11', 'EDFO11B', 'ORPD11', 'FPNG11', 'PRSV11',
      'PABY11', 'PATC11', 'PRSN11B', 'PLCR11', 'PORD11', 'PLRI11',
      'VPSI11', 'PBLV11', 'QAGR11', 'RBCO11', 'FIIP11B', 'RFOF11', 'RCRI11B', 'RBGS11', 'RBRD11',
      'RBTS11', 'RBIV11', 'RBRM11', 'RBRL11', 'RBRY11', 'RBRP11', 'RBRF11', 'RBIR11',
      'RBDS11', 'RSPD11', 'RBRR11', 'REIT11', 'RBED11', 'RBFF11', 'RCRB11', 'RBVA11', 'RBVO11', 'RNGO11',
      'FLMA11', 'SADI11', 'SARE11', 'SFND11', 'FISC11', 'SCPF11', 'SDIL11', 'SHDP11B',
      'JRDM11', 'SAIC11B', 'SPTW11', 'SPAF11', 'STRX11', 'TBOF11', 'EPP11', 'TGAR11', 'ONEF11', 
      'TORD11', 'ALMI11', 'TRNT11', 'TOUR11', 'TORM13', 'TSNC11', 'TCPF11', 'TRXF11', 'XTED11',
      'UBSR11', 'RECT11', 'VOTS11', 'FVPQ11', 'VVPR11', 'VGIP11', 'VGIR11', 'FVBI11', 'CVBI11',
      'LVBI11', 'RVBI11', 'VCJR11', 'VERE11', 'FIVN11', 'VINO11', 'VIFI11', 'VISC11', 'VILG11',
      'VTLT11', 'VSHO11', 'VLJS12', 'WPLZ11', 'WTSP11B', 'XPCI11', 'XPHT11',
      'XPIN11', 'XPLG11', 'XPCM11', 'XPML11', 'XPPR11', 'XPSF11', 'YCHY11',
    ];

    if (actives.includes(name)) {
      const data = await rp(`${process.env.LINK_STOCKS}${name}`);

      let $ = cheerio.load(data);
      const price = $(`strong[class=value]`)[0].children[0].data;

      const formatPrice = price.replace(',', '.');

      return response.json({ price: eval(`${formatPrice} + 0`) });
    } else {
      return response.json({ error: true });
    }
  },
};