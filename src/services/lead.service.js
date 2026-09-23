import * as leadRepository from "../repositories/lead.repository.js";

export const createLead = async (data) => {
  return leadRepository.createLead(data);
};

export const getLeads = async (search) => {
  return leadRepository.findLeads(search);
};

export const updateLeadStatus = async (id, status) => {
  const existingLead = await leadRepository.findLeadById(id);

  if (!existingLead) {
    const error = new Error("Lead not found");
    error.statusCode = 404;
    throw error;
  }

  return leadRepository.updateLeadStatus(id, status);
};
