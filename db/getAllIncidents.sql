select inc.id, state, inj.name injury, aa.name affectedArea, causes.name cause from incidents inc
join injuries inj on inc.injuryid=inj.id
join affectedareas aa on aa.id = inj.affectedareaid
join causes on causes.id=inc.causeid
